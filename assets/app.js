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
  }, 1000);
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
