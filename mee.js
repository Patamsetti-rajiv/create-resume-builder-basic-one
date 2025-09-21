let skills = [];

document.getElementById("skillInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const skill = this.value.trim();
    if (skill) {
      skills.push(skill);
      this.value = "";
      renderSkills();
    }
  }
});

function renderSkills() {
  const container = document.getElementById("skillsContainer");
  container.innerHTML = "";
  skills.forEach((skill) => {
    const chip = document.createElement("div");
    chip.className = "skill-chip";
    chip.textContent = skill;
    container.appendChild(chip);
  });
}

function generateResume() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const summary = document.getElementById("summary").value;
  const education = document.getElementById("education").value;
  const experience = document.getElementById("experience").value;
  const template = document.getElementById("template").value;

  const photoInput = document.getElementById("photoInput");
  let imageTag = "";
  if (photoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageTag = `<img src="${e.target.result}" alt="Profile Photo" />`;
      fillResume();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    fillResume();
  }

  function fillResume() {
    let html = "";
    if (template === "template1") {
      html = `
        ${imageTag}
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Summary</h3>
        <p>${summary}</p>
        <h3>Skills</h3>
        <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
      `;
    } else {
      html = `
        <div style="border-left: 4px solid #4facfe; padding-left: 20px;">
          ${imageTag}
          <h1>${name}</h1>
          <p>${email} | ${phone}</p>
          <hr/>
          <h3>About</h3><p>${summary}</p>
          <h3>Skills</h3><p>${skills.join(', ')}</p>
          <h3>Education</h3><p>${education}</p>
          <h3>Experience</h3><p>${experience}</p>
        </div>
      `;
    }

    document.getElementById("resumePreview").innerHTML = html;
  }
}

function downloadPDF() {
  const element = document.getElementById("resumePreview");
  html2pdf().from(element).save("My_Resume.pdf");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
