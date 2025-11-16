/* =====================================================
   MathLearn - app.js (FINAL TANPA DARK MODE)
   Semua logic utama: auth, quiz, navbar, loading, dsb
   ===================================================== */

/* -----------------------------------------------------
   LOADING SCREEN
----------------------------------------------------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loading = document.getElementById("loadingScreen");
    if (loading) {
      loading.style.opacity = "0";
      setTimeout(() => loading.style.display = "none", 300);
    }
  }, 850);
});

/* -----------------------------------------------------
   AUTH SYSTEM (email + password)
----------------------------------------------------- */

/* REGISTER */
function registerUser(e) {
  e.preventDefault();

  const email = document.getElementById("reg_email").value.trim();
  const pass = document.getElementById("reg_password").value.trim();
  const confirm = document.getElementById("reg_confirm").value.trim();

  if (!email || !pass || !confirm) {
    alert("Semua field harus diisi!");
    return;
  }

  if (pass !== confirm) {
    alert("Password konfirmasi tidak cocok!");
    return;
  }

  const user = { email, password: pass };
  localStorage.setItem("ml_user", JSON.stringify(user));

  alert("Registrasi berhasil! Silakan login.");
  window.location.href = "login.html";
}

/* LOGIN */
function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("log_email").value.trim();
  const pass = document.getElementById("log_password").value.trim();

  const saved = JSON.parse(localStorage.getItem("ml_user"));

  if (!saved) {
    alert("Akun belum terdaftar!");
    return;
  }

  if (email === saved.email && pass === saved.password) {
    localStorage.setItem("ml_logged", "true");

    // jika sebelumnya mau buka halaman materi
    const pending = localStorage.getItem("ml_pending");
    if (pending) {
      localStorage.removeItem("ml_pending");
      window.location.href = pending;
      return;
    }

    window.location.href = "index.html";
  } else {
    alert("Email / password salah!");
  }
}

/* LOGOUT */
function logoutUser() {
  localStorage.removeItem("ml_logged");
  window.location.href = "index.html";
}

/* -----------------------------------------------------
   HALAMAN MATERI WAJIB LOGIN
----------------------------------------------------- */
function requireLogin(page) {
  const logged = localStorage.getItem("ml_logged") === "true";

  if (!logged) {
    localStorage.setItem("ml_pending", page);
    window.location.href = "login.html";
  }
}

/* -----------------------------------------------------
   NAVBAR LOGIN STATUS
----------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const logged = localStorage.getItem("ml_logged") === "true";
  const area = document.getElementById("accountAreaDesktop");

  if (area) {
    if (logged) {
      area.innerHTML = `
        <button onclick="logoutUser()"
          class="px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700">
          Logout
        </button>
      `;
    } else {
      area.innerHTML = `
        <a href="login.html"
          class="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
          Login
        </a>
      `;
    }
  }

  // HERO BUTTON
  const hero = document.getElementById("heroButtonContainer");
  if (hero) {
    if (logged) {
      hero.innerHTML = `
        <a href="aljabar.html"
           class="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow hover:bg-blue-50 transition">
          Lanjutkan Belajar
        </a>
      `;
    } else {
      hero.innerHTML = `
        <a href="register.html"
           class="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow hover:bg-blue-50 transition">
          Mulai Belajar
        </a>
      `;
    }
  }
});

/* -----------------------------------------------------
   QUIZ SYSTEM UNIVERSAL
----------------------------------------------------- */
let totalQuestions = 0;
let score = 0;

function startQuiz() {
  const startBox = document.getElementById("quizStart");
  const content = document.getElementById("quizContent");
  const result = document.getElementById("quizResult");

  if (startBox) startBox.style.display = "none";
  if (content) content.style.display = "block";
  if (result) result.style.display = "none";

  const opts = document.querySelectorAll(".quiz-option[data-correct]");
  totalQuestions = opts.length;
  score = 0;

  opts.forEach(opt => {
    opt.className = "quiz-option";
    opt.classList.remove("answered");
  });
}

function checkQuiz(el) {
  if (el.classList.contains("answered")) return;

  const correct = el.dataset.correct === "true";
  el.classList.add("answered");

  if (correct) {
    el.classList.add("correct");
    score++;
  } else {
    el.classList.add("wrong");
  }

  const answered = document.querySelectorAll(".quiz-option.answered").length;
  if (answered === totalQuestions) showResult();
}

function showResult() {
  const box = document.getElementById("quizResult");
  if (!box) return;

  document.getElementById("quizScore").textContent =
    `Kamu menjawab ${score} dari ${totalQuestions} soal dengan benar!`;

  box.classList.add("show");
}

/* -----------------------------------------------------
   MOBILE MENU
----------------------------------------------------- */
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.toggle("hidden");
}

/* -----------------------------------------------------
   END OF FILE
----------------------------------------------------- */
