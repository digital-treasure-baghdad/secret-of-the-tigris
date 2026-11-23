import { amount, issueReward, readReward } from './cashu.js';
import { normalize, puzzles } from './puzzles.js';

const key = 'digital-treasure-baghdad-v1';
const get = (id) => document.getElementById(id);
const form = get('answer-form');
const answer = get('answer');
const answerFeedback = get('answer-feedback');
const rewardFeedback = get('reward-feedback');
const claim = get('claim');
const reset = get('reset');
const about = get('about');
const arabicNumber = new Intl.NumberFormat('ar-IQ');

function loadState() {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (Number.isInteger(value?.solved) && value.solved >= 0 && value.solved <= puzzles.length) {
      return { solved: value.solved, token: value.solved === puzzles.length ? readReward(value.token) : '' };
    }
  } catch {
    // The game remains usable when local storage is blocked.
  }
  return { solved: 0, token: '' };
}

let state = loadState();
let claiming = false;

function saveState() {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Keep progress in memory for this page.
  }
}

function feedback(node, message, error = false) {
  node.textContent = message;
  node.toggleAttribute('data-error', error);
}

function renderReward() {
  const finished = state.solved === puzzles.length;
  claim.disabled = !finished || claiming;
  claim.hidden = Boolean(state.token);
  get('token-result').hidden = !state.token;
  get('token').value = state.token;
  reset.disabled = claiming;
}

function render() {
  const current = puzzles[state.solved];
  get('progress-label').textContent = `حُلّت ${arabicNumber.format(state.solved)} من ${arabicNumber.format(puzzles.length)} محطات`;
  get('route').replaceChildren(...puzzles.map((puzzle, index) => {
    const item = document.createElement('li');
    const icon = document.createElement('span');
    const done = index < state.solved;
    icon.textContent = done ? '✓' : '◇';
    icon.setAttribute('aria-hidden', 'true');
    item.append(icon, puzzle.stop);
    if (done) {
      item.dataset.done = '';
      item.setAttribute('aria-label', `${puzzle.stop} · اكتملت`);
    } else if (index === state.solved) {
      item.setAttribute('aria-current', 'step');
    }
    return item;
  }));

  get('clue-index').textContent = current ? `المحطة ${arabicNumber.format(state.solved + 1)}` : 'الرحلة مكتملة';
  get('clue-title').textContent = current ? current.title : 'فتحت صندوق الكنز';
  get('clue-text').textContent = current ? current.clue : 'جمعت المفاتيح الثلاثة. تقدر الآن تستلم توكن Cashu التجريبي من صندوق الكنز.';
  get('hint').textContent = current?.hint ?? '';
  get('hint-box').open = false;
  get('hint-box').hidden = !current;
  form.hidden = !current;
  reset.hidden = state.solved === 0;
  get('start').textContent = state.solved > 0 ? 'تابع الرحلة' : 'ابدأ الرحلة';
  if (!current) get('start').textContent = 'راجع الرحلة';
  renderReward();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const puzzle = puzzles[state.solved];
  if (!puzzle) return;
  if (!puzzle.answers.some((choice) => normalize(choice) === normalize(answer.value))) {
    feedback(answerFeedback, 'الجواب بعده مو صحيح. جرّب مرة ثانية أو افتح التلميح.', true);
    answer.setAttribute('aria-invalid', 'true');
    return;
  }
  state.solved += 1;
  saveState();
  answer.value = '';
  answer.removeAttribute('aria-invalid');
  feedback(answerFeedback, '');
  render();
  get('clue-title').focus();
});

answer.addEventListener('input', () => {
  answer.removeAttribute('aria-invalid');
  feedback(answerFeedback, '');
});

claim.addEventListener('click', async () => {
  if (claiming || state.token || state.solved !== puzzles.length) return;
  claiming = true;
  renderReward();
  feedback(rewardFeedback, 'جارٍ إصدار التوكن من Testnut…');
  try {
    state.token = await issueReward();
    saveState();
    feedback(rewardFeedback, `تم إصدار توكن بقيمة ${arabicNumber.format(amount)} ساتوشي تجريبي.`);
  } catch {
    feedback(rewardFeedback, 'تعذّر الإصدار من Testnut الآن. تحقق من الاتصال وحاول مرة ثانية.', true);
  } finally {
    claiming = false;
    renderReward();
    (state.token ? get('copy') : claim).focus();
  }
});

get('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(state.token);
    feedback(rewardFeedback, 'تم نسخ التوكن.');
  } catch {
    get('token').focus();
    get('token').select();
    feedback(rewardFeedback, 'حدّدت التوكن حتى تقدر تنسخه يدويًا.');
  }
});

reset.addEventListener('click', () => {
  if (!window.confirm('إعادة الرحلة تمسح التقدّم والتوكن المحفوظ في هذا المتصفح. أكّد الإعادة؟')) return;
  state = { solved: 0, token: '' };
  saveState();
  feedback(answerFeedback, '');
  feedback(rewardFeedback, '');
  answer.value = '';
  answer.removeAttribute('aria-invalid');
  render();
  get('clue-title').focus();
});

get('start').addEventListener('click', () => get('hunt-title').focus({ preventScroll: true }));
get('about-open').addEventListener('click', () => about.showModal());

render();
