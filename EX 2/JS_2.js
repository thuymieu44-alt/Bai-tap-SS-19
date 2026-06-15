const courses = [
  {
    id: 1,
    content: 'Learn Javascript Session 01',
    dueDate: '2023-04-17',
    status: 'Pending',
    assignedTo: 'Anh Bách',
  },
  {
    id: 2,
    content: 'Learn Javascript Session 2',
    dueDate: '2023-04-17',
    status: 'Pending',
    assignedTo: 'Lâm th`',
  },
  {
    id: 3,
    content: 'Learn CSS Session 1',
    dueDate: '2023-04-17',
    status: 'Pending',
    assignedTo: 'Hiếu Ci ớt ớt',
  },
];

const tBody = document.getElementById('tbody');
const form = document.getElementById('form');

function loadCourses() {
  const stored = localStorage.getItem('courses');
  if (!stored) return;
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      courses.splice(0, courses.length, ...parsed);
    }
  } catch (err) {
    console.warn('Không thể đọc dữ liệu', err);
  }
}

function saveCourses() {
  try {
    localStorage.setItem('courses', JSON.stringify(courses));
  } catch (err) {
    console.warn('Không thể lưu ', err);
  }
}

function getNextId() {
  return courses.length ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
}

function renderCourses() {
  if (!tBody) return;
  tBody.innerHTML = '';
  courses.forEach((e) => {
    const tr = document.createElement('tr');
    tr.dataset.id = e.id;
    tr.innerHTML = `
      <td>${e.id}</td>
      <td>${e.content}</td>CSS_1
      <td>${e.dueDate}</td>
      <td>${e.status}</td>
      <td>${e.assignedTo}</td>
      <td>
        <span>
          <button class="btnRe">Sửa</button>
          <button class="btnDelete">Xóa</button>
        </span>
      </td>`;
    tBody.appendChild(tr);
  });
  saveCourses();
}

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const content = form.elements['content']?.value.trim();
    const dueDate = form.elements['dueDate']?.value;
    const assignedTo = form.elements['assignedTo']?.value.trim();
    if (!content || !dueDate || !assignedTo) {
      return;
    }
    const id = getNextId();
    courses.push({
      id,
      content,
      dueDate,
      status: 'Pending',
      assignedTo,
    });
    renderCourses();
    form.reset();
  });
}

if (tBody) {
  tBody.addEventListener('click', function (event) {
    const target = event.target;
    const row = target.closest('tr');
    if (!row) return;
    const id = Number(row.dataset.id);

    if (target.classList.contains('btnDelete')) {
      const index = courses.findIndex((e) => e.id === id);
      if (index !== -1) {
        courses.splice(index, 1);
        renderCourses();
      } else {
        alert('Dữ liệu không tồn tại');
      }
      return;
    }

    if (target.classList.contains('btnRe')) {
      const course = courses.find((e) => e.id === id);
      if (!course) {
        alert('Dữ liệu không tồn tại');
        return;
      }
      const newCon = prompt('New Content:', course.content);
      const newDate = prompt('New Date:', course.dueDate);
      const newSta = prompt('New Status:', course.status);
      const newAssignedTo = prompt('New Assigned To:', course.assignedTo);

      if (newCon !== null && newDate !== null && newSta !== null && newAssignedTo !== null) {
        course.content = newCon.trim() || course.content;
        course.dueDate = newDate || course.dueDate;
        course.status = newSta.trim() || course.status;
        course.assignedTo = newAssignedTo.trim() || course.assignedTo;
        renderCourses();
      }
    }
  });
}

loadCourses();
renderCourses();
