new Vue({
  el: "#app",
  data: {
    isPlaying: false,
    playerHealth: 100,
    monsterHealth: 100,
    logs: [],
  },
  methods: {
    startGame: function () {
      this.isPlaying = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.logs = [];
    },
    attack: function () {
      const damage = this.calculateDamage(3, 10);
      // Damage values, calc
      this.monsterHealth -= damage;

      // Add to the beginning on array
      this.logs.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage} damage`,
      });

      // Check if Won
      if (this.checkWin()) {
        return;
      }

      this.monsterDamage();
    },
    specialAttack: function () {
      const damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;

      // Add to the beginning on array
      this.logs.unshift({
        isPlayer: true,
        text: `Player hits Monster hard for ${damage} damage`,
      });

      // Check if Won
      if (this.checkWin()) {
        return;
      }

      this.monsterDamage();
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      // Add to the beginning on array
      this.logs.unshift({
        isPlayer: true,
        text: `Player heals for 10`,
      });

      this.monsterDamage();
    },
    giveUp: function () {
      this.isPlaying = false;
    },
    monsterDamage: function () {
      const damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;

      // Check if Won
      this.checkWin();

      // Add to the beginning on array
      this.logs.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage} damage`,
      });
    },
    calculateDamage: function (min, max) {
      return (damage = Math.max(Math.floor(Math.random() * max) + 1, min));
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New game?")) {
          this.startGame;
        } else {
          this.isPlaying = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New game?")) {
          this.startGame;
        } else {
          this.isPlaying = false;
        }
        return true;
      }
      return false;
    },
  },
});
