    const liveShellSVG = `
      <svg class="shell-svg" viewBox="0 0 20 45" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 0 h16 v35 h-16 z" fill="var(--live-color)" rx="2"/>
        <path d="M2 0 C 2 -3, 18 -3, 18 0" fill="var(--live-color)"/>
        <rect x="0" y="35" width="20" height="10" fill="var(--gold-color)" rx="1"/>
        <circle cx="10" cy="40" r="3" fill="#8a7346"/>
        <circle cx="10" cy="40" r="1.5" fill="#e6cd98"/>
        <rect x="4" y="2" width="2" height="30" fill="rgba(255,255,255,0.2)"/>
      </svg>
    `;

    const blankShellSVG = `
      <svg class="shell-svg" viewBox="0 0 20 45" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 0 h16 v35 h-16 z" fill="var(--blank-color)" rx="2"/>
        <path d="M2 0 C 2 -3, 18 -3, 18 0" fill="var(--blank-color)"/>
        <rect x="0" y="35" width="20" height="10" fill="var(--gold-color)" rx="1"/>
        <circle cx="10" cy="40" r="3" fill="#8a7346"/>
        <circle cx="10" cy="40" r="1.5" fill="#e6cd98"/>
        <rect x="4" y="2" width="2" height="30" fill="rgba(255,255,255,0.1)"/>
      </svg>
    `;

    function updateCount(type, delta) {
      const input = document.getElementById(type);
      let value = parseInt(input.value) || 0;
      setCount(type, value + delta);
    }

    function setCount(type, value) {
      const input = document.getElementById(type);
      if (value < 0) value = 0;
      if (value > 8) value = 8;
      input.value = value;
      calculate();
    }

    function manualInput(type) {
      const input = document.getElementById(type);
      setCount(type, parseInt(input.value) || 0);
    }

    function reset() {
      document.getElementById('live').value = 0;
      document.getElementById('blank').value = 0;
      calculate();
    }

    function updateVisualShells(liveCount, blankCount) {
      const container = document.getElementById('shellContainer');
      container.innerHTML = '';
      const total = liveCount + blankCount;
      
      document.getElementById('statusMessage').style.color = total > 8 ? 'var(--live-color)' : 'var(--border-color)';

      let shells = [];
      for(let i=0; i<liveCount; i++) shells.push(liveShellSVG);
      for(let i=0; i<blankCount; i++) shells.push(blankShellSVG);
      
      // Shuffle logic for visualization
      for (let i = shells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shells[i], shells[j]] = [shells[j], shells[i]];
      }

      shells.forEach((shell, index) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = shell;
        const svg = wrapper.firstElementChild;
        svg.style.animationDelay = `${index * 0.05}s`;
        container.appendChild(svg);
      });
    }

    function calculate() {
      const live = parseInt(document.getElementById("live").value) || 0;
      const blank = parseInt(document.getElementById("blank").value) || 0;
      const total = live + blank;

      const liveEl = document.getElementById("livePercent");
      const blankEl = document.getElementById("blankPercent");
      const statusEl = document.getElementById("statusMessage");

      updateVisualShells(live, blank);

      if (total === 0) {
        liveEl.innerText = "0%";
        blankEl.innerText = "0%";
        statusEl.innerText = "CHAMBER EMPTY";
        return;
      }

      const liveChance = (live / total) * 100;
      const blankChance = (blank / total) * 100;

      liveEl.innerText = (liveChance % 1 === 0 ? liveChance : liveChance.toFixed(1)) + "%";
      blankEl.innerText = (blankChance % 1 === 0 ? blankChance : blankChance.toFixed(1)) + "%";
      statusEl.innerText = `Total Shells: ${total}`;
    }

    window.onload = calculate;