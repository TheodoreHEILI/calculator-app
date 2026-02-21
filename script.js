const display = document.getElementById('display');

let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  const maxLength = 12;
  let text = currentValue;
  if (text.length > maxLength) {
    text = parseFloat(currentValue).toExponential(6);
  }
  display.textContent = text;
}

function inputDigit(digit) {
  if (shouldResetDisplay) {
    currentValue = digit;
    shouldResetDisplay = false;
  } else {
    if (currentValue === '0' && digit !== '.') {
      currentValue = digit;
    } else {
      currentValue += digit;
    }
  }
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay();
}

function clear() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function toggleSign() {
  if (currentValue === '0') return;
  currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue;
  updateDisplay();
}

function percent() {
  currentValue = String(parseFloat(currentValue) / 100);
  updateDisplay();
}

function doOperation(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  switch (op) {
    case '+': return x + y;
    case '−': return x - y;
    case '×': return x * y;
    case '÷': return y === 0 ? NaN : x / y;
    default: return y;
  }
}

function setOperator(op) {
  if (operator !== null && !shouldResetDisplay) {
    const result = doOperation(previousValue, currentValue, operator);
    if (Number.isNaN(result)) {
      currentValue = 'Error';
      previousValue = null;
      operator = null;
      updateDisplay();
      return;
    }
    currentValue = String(result);
    updateDisplay();
  }
  previousValue = currentValue;
  operator = op;
  shouldResetDisplay = true;
}

function equals() {
  if (operator === null || previousValue === null) return;
  const result = doOperation(previousValue, currentValue, operator);
  if (Number.isNaN(result)) {
    currentValue = 'Error';
  } else {
    currentValue = String(result);
  }
  previousValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const digit = btn.getAttribute('data-digit');
    const action = btn.getAttribute('data-action');
    const op = btn.getAttribute('data-operator');

    if (currentValue === 'Error') clear();

    if (digit !== null) {
      inputDigit(digit);
      return;
    }
    if (action === 'decimal') {
      inputDecimal();
      return;
    }
    if (action === 'clear') {
      clear();
      return;
    }
    if (action === 'toggle') {
      toggleSign();
      return;
    }
    if (action === 'percent') {
      percent();
      return;
    }
    if (action === 'operator' && op) {
      setOperator(op);
      return;
    }
    if (action === 'equals') {
      equals();
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    document.querySelector(`[data-digit="${e.key}"]`)?.click();
  } else if (e.key === '.') {
    document.querySelector('[data-action="decimal"]')?.click();
  } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
    document.querySelector('[data-action="clear"]')?.click();
  } else if (e.key === '+') {
    document.querySelector('[data-operator="+"]')?.click();
  } else if (e.key === '-') {
    document.querySelector('[data-operator="−"]')?.click();
  } else if (e.key === '*') {
    document.querySelector('[data-operator="×"]')?.click();
  } else if (e.key === '/') {
    e.preventDefault();
    document.querySelector('[data-operator="÷"]')?.click();
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    document.querySelector('[data-action="equals"]')?.click();
  }
});
