// nav-auth.js — injeta dinamicamente o estado de login na nav
import { auth, db, doc } from './firebase.js';
import { getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

onAuthStateChanged(auth, async function(user) {
  const area = document.getElementById('nav-user-area');
  if (!area) return;

  if (!user) {
    area.innerHTML = '<a href="login.html">Login</a>';
    return;
  }

  let nick = user.displayName || 'Jogador';
  let avatarUrl = 'https://api.dicebear.com/8.x/pixel-art/svg?seed=' + encodeURIComponent(nick);

  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      const data = snap.data();
      nick      = data.nickname || nick;
      avatarUrl = data.avatarUrl || ('https://api.dicebear.com/8.x/pixel-art/svg?seed=' + encodeURIComponent(nick));
    }
  } catch(e) { /* falha silenciosa */ }

  area.innerHTML =
    '<div class="nav-user-dd" id="nav-user-dd">' +
      '<button class="nav-user-btn" type="button" id="nav-user-toggle">' +
        '<img class="nav-user-avatar" src="' + avatarUrl + '" alt="' + nick + '"/>' +
        '<span class="nav-user-nick">' + nick + '</span>' +
        '<span class="nav-user-caret">▼</span>' +
      '</button>' +
      '<div class="nav-user-menu">' +
        '<a href="perfil.html">👤 O meu Perfil</a>' +
        '<button class="menu-logout" id="nav-logout-btn">⏻ Terminar Sessão</button>' +
      '</div>' +
    '</div>';

  document.getElementById('nav-user-toggle').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('nav-user-dd').classList.toggle('open');
  });

  document.getElementById('nav-logout-btn').addEventListener('click', function() {
    signOut(auth).then(function() { window.location.href = 'login.html'; });
  });

  document.addEventListener('click', function(e) {
    var dd = document.getElementById('nav-user-dd');
    if (dd && !dd.contains(e.target)) dd.classList.remove('open');
  });
});
