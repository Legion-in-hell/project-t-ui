document.querySelectorAll(".game-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    let command;
    if (this.classList.contains("attack")) {
      command = "!attack";
    } else if (this.classList.contains("flee")) {
      command = "!flee";
    } else if (this.classList.contains("rest")) {
      command = "!rest";
    } else if (this.classList.contains("wakeup")) {
      command = "!wakeup";
    } else if (this.classList.contains("pet")) {
      command = "!pet";
    } else if (this.classList.contains("mastery")) {
      command = "!masteries";
    } else if (this.classList.contains("worldboss")) {
      command = "!worldboss";
    } else if (this.classList.contains("env-public")) {
      command = "!env public";
    } else if (this.classList.contains("env-test")) {
      command = "!env test";
    } else if (this.classList.contains("env-dev")) {
      command = "!env dev";
    } else if (this.classList.contains("gamestats")) {
      command = "!gamestats";
    } else if (this.classList.contains("gameinfo")) {
      command = "!gameinfo";
    }

    if (command) {
      fetch("/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: command }),
      });
    }
  });
});

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    let monsterName = this.querySelector(".monster-title")
      .textContent.split("|")[1]
      .trim();
    let command = `!attack ${monsterName}`;

    fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: command }),
    });
  });
});

const ws = new WebSocket("ws://localhost:3000");

ws.addEventListener("message", function (event) {
  const data = JSON.parse(event.data);
  if (data.username.toLowerCase() === "wizebot") {
    handleWizeBotMessage(data.message);
  }
});

function handleWizeBotMessage(message) {
  console.log("Message de WizeBot reçu:", message);
  if (message.includes("📝 (🌍public)")) {
    updatePlayerProfile(message);
  }
}

document.getElementById("refreshButton").addEventListener("click", function () {
  fetch("/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "!player" }),
  });
});

function updatePlayerProfile(message) {
  if (message.includes("📝 (🌍public)")) {
    const rankMatch =
      message.match(/⭐\w+\((.+?)\)/) ||
      message.match(/(🌍public)\w+\((.+?)\)/);
    const statsMatch = message.match(/🛡(\d+) 💨(\d+)% 💞(\d+)\(\+(\d+)%\)/);
    const statsExtraMatch = message.match(/🍀(\d+)%\(\+(\d+)%\) 💰(\d+)/);
    const combatMatch = message.match(/💥\[(\d+-\d+)\] 👊🏾(\d+)/);
    const combatExtraMatch = message.match(/👊🏼(\d+) ✨(\d+)%/);
    const resistMatch = message.match(/🦶(\d+) 💢(\d+)%/);
    if (rankMatch) {
      document.querySelector(".player-rank").textContent =
        "Rang: " + (rankMatch[1] || "???");
    }
    if (statsMatch) {
      document.querySelector(".player-stats").textContent = `🛡 Défense: ${
        statsMatch[1] || "???"
      } | 💨 Esquive: ${statsMatch[2] || "???"}% | 💞 PVT: ${
        statsMatch[3] || "???"
      } (+${statsMatch[4] || "???"}%)`;
    }
    if (statsExtraMatch) {
      document.querySelector(".player-statss").textContent = `🍀 Chance: ${
        statsExtraMatch[1] || "???"
      }% (+${statsExtraMatch[2] || "???"}%) | 💰 Or: ${
        statsExtraMatch[3] || "???"
      }`;
    }
    if (combatMatch) {
      document.querySelector(".player-combat").textContent = `💥 Dégâts: ${
        combatMatch[1] || "???"
      } | 👊🏾 Nb. coups min.: ${combatMatch[2] || "???"}`;
    }
    if (combatExtraMatch) {
      document.querySelector(
        ".player-combatt"
      ).textContent = `👊🏼 Nb. coups max.: ${
        combatExtraMatch[1] || "???"
      } | ✨ Crit.: ${combatExtraMatch[2] || "???"}%`;
    }
    if (resistMatch) {
      document.querySelector(".player-resist").textContent = `🦶 Speed: ${
        resistMatch[1] || "???"
      } | 💢 Menace: ${resistMatch[2] || "???"}%`;
    }

    const weaponMatch = message.match(/⚔([^|]+) \|/);
    if (weaponMatch) {
      document.querySelector(".arme").textContent =
        weaponMatch[1].trim() || "???";
    }

    const equipmentMatch = message.match(/\| ([^|]+) \| [^|]+$/);
    if (equipmentMatch) {
      const equipmentItems = equipmentMatch[1].split(", ");
      document.querySelector(".casque").textContent =
        equipmentItems[0] || "???";
      document.querySelector(".plastron").textContent =
        equipmentItems[1] || "???";
      document.querySelector(".jambiere").textContent =
        equipmentItems[2] || "???";
      document.querySelector(".gant").textContent = equipmentItems[3] || "???";
      document.querySelector(".pied").textContent = equipmentItems[4] || "???";
    }

    const accessoryMatch = message.match(/\| (.+?)$/);
    if (accessoryMatch) {
      const accessoryItems = accessoryMatch[1].split(", ");
      document.querySelector(".cape").textContent = accessoryItems[0] || "???";
      document.querySelector(".ceinture").textContent =
        accessoryItems[1] || "???";
    }

    const accessoriesMatches = message.match(
      /📿=(.+?), 🩹=(.+?), 💍=(.+?), 🔗=(.+?) \|/
    );
    if (accessoriesMatches) {
      document.querySelector(".collier").textContent = `📿 Collier (${
        accessoriesMatches[1] || "???"
      })`;
      document.querySelector(".bracelet").textContent = `🩹 Bracelet (${
        accessoriesMatches[2] || "???"
      })`;
      document.querySelector(".bague").textContent = `💍 Bague (${
        accessoriesMatches[3] || "???"
      })`;
      document.querySelector(".boucle").textContent = `🔗 Boucle d'oreille (${
        accessoriesMatches[4] || "???"
      })`;
    }
    if (message.startsWith("📝 (🌎test)")) {
      alert("Veuillez vous connecter au serveur public pour voir votre profil");
    } else if (message.startsWith("📝 (🌎dev)")) {
      alert("Veuillez vous connecter au serveur public pour voir votre profil");
    }
  }
}
