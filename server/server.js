import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const SECRET_KEY = "shibuya_super_mega_secret_key_change_me_later";

app.use(helmet()); 
app.use(express.json({ limit: '10kb' })); 
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200,
  message: { error: 'Trop de requêtes, calmez-vous !' }
});
app.use('/api', apiLimiter);

const DB_PATH = path.resolve(__dirname, '..', 'localDB.json');
function readDB() {
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], content: {}, resetRequests: [] }));
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  if (!data.resetRequests) data.resetRequests = [];
  return data;
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token invalide ou expiré' });
  }
};

const requireUnivers = (req, res, next) => {
  if (req.user.role !== 'Univers') {
    return res.status(403).json({ error: 'Permission refusée. Réservé à l\'Univers.' });
  }
  next();
};

/* --- ROUTES AUTHENTIFICATION --- */
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const db = readDB();

  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Ce nom existe déjà' });
  }

  // Le premier compte devient "Univers"
  const role = db.users.length === 0 ? 'Univers' : 'USER';
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword, role };
  
  db.users.push(newUser);
  writeDB(db);

  const token = jwt.sign({ id: newUser.id, username, role }, SECRET_KEY, { expiresIn: '7d' });
  res.json({ token, user: { id: newUser.id, username, role } });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Utilisateur introuvable' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

/* --- MOT DE PASSE OUBLIÉ --- */
app.post('/api/forgot-password', (req, res) => {
  const { username, discordId } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.username === username);
  
  if (!user) {
    // Par sécurité, on ne dit pas si le compte existe ou non pour éviter les leaks d'informations existantes
    return res.json({ success: true, message: 'Si ce nom existe, la demande a été envoyée.' });
  }

  db.resetRequests.push({ id: Date.now(), userId: user.id, username: user.username, discordId, date: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true, message: 'La demande a bien été envoyée à l\'Univers.' });
});

/* --- ROUTES DONNEES --- */
app.get('/api/db', (req, res) => {
  const db = readDB();
  const safeUsers = db.users.map(u => ({ id: u.id, username: u.username, role: u.role }));
  // L'Univers a accès aux requêtes de mot de passe
  let requests = [];
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, SECRET_KEY);
      if (decoded.role === 'Univers') {
        requests = db.resetRequests || [];
      }
    } catch(e) {}
  }
  
  res.json({ users: safeUsers, content: db.content, resetRequests: requests });
});

/* --- ROUTES ADMIN --- */
app.post('/api/update-role', requireAuth, requireUnivers, (req, res) => {
  const { targetUserId, newRole } = req.body;
  const db = readDB();
  const target = db.users.find(u => u.id === targetUserId);

  if (target) {
    target.role = newRole;
    writeDB(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Utilisateur introuvable' });
  }
});

app.post('/api/admin/force-password', requireAuth, requireUnivers, async (req, res) => {
  const { targetUserId, newPassword, requestId } = req.body;
  const db = readDB();
  const target = db.users.find(u => u.id === targetUserId);

  if (target && newPassword) {
    target.password = await bcrypt.hash(newPassword, 10);
    // On retire la requête de mot de passe oublié associée
    db.resetRequests = db.resetRequests.filter(req => req.id !== requestId);
    writeDB(db);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Informations invalides' });
  }
});

app.post('/api/admin/delete-request', requireAuth, requireUnivers, (req, res) => {
  const { requestId } = req.body;
  const db = readDB();
  db.resetRequests = db.resetRequests.filter(req => req.id !== requestId);
  writeDB(db);
  res.json({ success: true });
});

app.post('/api/content', requireAuth, requireUnivers, (req, res) => {
  const { contentKey, newText } = req.body;
  const db = readDB();
  db.content[contentKey] = newText;
  writeDB(db);
  res.json({ success: true, content: db.content });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Express Sécurisé lancé sur http://localhost:${PORT}`);
});
