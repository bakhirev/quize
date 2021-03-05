<template>
  <div class="quiz-footer">
    <div v-if="progressPercent" class="quiz-footer-progress-description">
      <span class="quiz-footer-progress-title">Готово:</span>
      <span class="quiz-footer-progress-value">
        {{ progressPercent }}
      </span>
    </div>
    <div class="quiz-footer-progress">
      <div
          v-if="progressPercent"
          :style="progress"
          class="quiz-footer-progress-line"
      ></div>
    </div>
    <div class="quiz-footer-buttons">
      <div class="quiz-footer-prev" @click="$emit('prev')">
        <svg class="quiz-footer-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                fill-rule="nonzero"
                stroke-width="0"
          />
        </svg>
      </div>
      <div class="quiz-footer-next" @click="$emit('next')">
        Далее
        <svg class="quiz-footer-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              stroke-width="0"
              fill-rule="nonzero"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    step: Number,
    total: Number,
  },
  computed: {
    progressPercent() {
      return Math.ceil((100 / this.total) * this.step) + '%';
    },
    progress() {
      return {
        width: this.progressPercent,
      };
    }
  }
}
</script>

<style scoped>
.quiz-footer {
  position: relative;
  display: block;
  border-top: 1px solid var(--color-8);
  background-color: var(--color-5);
  box-sizing: border-box;
  padding: var(--space-xl) 0 0 var(--space-xl);

  /*background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAABOCAIAAACVAtz9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAABV0SURBVHhe7Z2PdxTVFcf7DxKpqFix+OvQehCkllotokhVqrUtpZ5S0YPYStBqK0ePVagi9QfyS0ABQX5DMMkmm2Q3IYGEIK/f++57b957M7MzuzOzssncc0/OzGR2d973fnL3vvtmNz8SpTVr16/7Llz3fjvbPFGN4q3EOp15gYEnBq909kSVCrAS64bmB6BxhL6P92sz2r3BGvf0cQX0NMzVSqzjzRaddA9FgtyOohfs0m1xXN0ixczPSqxD5msdGQMTLS+Q8Gnfv786w90bL7mnCdwoBtcyRmuLI1mtxNo1R9yw6BwVL2A6lhRghHkqlV+b7Ej3RhHn0IGkMMTbcsXAbXbVwUxWYu1aIGsi0Bwwl2MKPMJ/JYVf7kz3RhHlpID7BxAgbgsYgttsqyOtW4m1NkdQa5vcBjpMs+GYAz/h+PS48muuT1/qSPdHwUNzh+z9AdiUUxZnAY2eIbht8Vu1EmttgZRGVlbcMM1VsqbZhI1RnuYwI/Zj5Ffho5bXZ67rMfKoefjqD8AGnbUyWdxL3hbceZBdYi0tENEIGgM0AqMixAHTKDO7UzLSUzUxNWL5cJQPdax7A4Hbg60FxBvEpw3iLtxO5s6T7NmNdSCcJ6UBWjLNJYcCWudmRItTMlBWHCPAQ2KyKn2Q/MqAmBygn4FXZopbg+Ix8pB5+Ip+i3KFOPPNyduG26idD9kFYj01NTU+Pl6r1arVaqVS6evr65WGDeziIH6FE3CaekD7LUJBzhka6CBJa6ApPRuaOT9JlIf3igvd4viz4quHxL67xBfzxOdd4vM5s8m7aNQYOxSADlADmtiIE9+yVlH1iQ23XZNwCDKRnT/Wk5OT4LW/v39wcLBer09MTADca9euXddXhg3s4iB+hRNwGk7GQ/BAPqF9pvQy2rlMq3khJ2nO0KbY0DQP7KAQ7rkjFOPSpUMZ6AOVFN9huKEtppVe2s5Kdp5YI/UODAwgDWMD4KqjKQwn4yF4IB6ODXW0UFMy2cK5TLPQJklTyaGBRoTwbnt+s9i/yI9i6XEOraAYVymUFFCcAG7MLHXaZsEpbedAdj5YI++irhgZGclYUeDheBI8FZ5QHSrIlEZRTHPhoSppWXVQDW0y9KC4+Ba91XphKz2NQzeoBw2DzG2nbVOQZCU7K9ZXr14dkpZjiYyn4ufEk6tDOZpRhwTiDYtpladN4SGTNM0IhynNjBwQh3/th6r0Zh0aQklK26i57bQtm9x5kJ0Ja+RUTAELKhvwtHjynNO20YWk4Q2Lac7TxDQXHlaSxkz/4puzbxZYnHeJnn+SqiZtU7UtC5IIsnW8UpPdOtajo6OY7RWSULXhyfESeCG1n90CUYxAiUxXSf1TfwkFpvTMDlWpM8jVdpNkN7QWsa7VasPDw6a5UZzhJfBCeDm1n9GMOrxhmObaw9TT0Jf7d1D8SkUcX+PHo/S8HNpCYZ9sXY04vREdOw5fQ2sFa0CGiZ3aaYvh5XIg2+jCG6QUYx3H9KC40l8yXbgT2f1yHumSzTNIj2yDNW3HWtNYoyRA+lQ7bTS8aKZqRKHsYc16cevDzBFNnu4Xp9b5MSi9CIfORLbM2UGdLbt+6u4ojbUTwViym8MaEzgUu22oPcKGF8VLtz6DVCoYRTTTXFJHMt3zhq9+6cU51HbINr2RUJGdImE3gTUmcL29vYXOERtbpgtQKhimGWvTzsM0cVz28niOWKGF37Lv0VbvIs2hPPQnskdlP1tPH+NKkRhrAuuhoaE2LQHGGy4Al6F20pvDNGPNGtmpmlsfspd3pVd8/XBI99ILdmgO5VXXryZXauxSxMLajmaUpcUa7/6t8FSA4TKaLkUcITTT0eUHpol9oud1X/HS2+M9W0h/mj4O+6VIOGGrsEZYWqwrlUqO64hZDJeBi1E7aUwNXqugsLa6H9PyHiZTUk9cFPsW+nKX3h6H8tDfFNmIC6JDqccuRdyEHWWpsMZbf5s7eo0NF5O2HFIoG6x1qlZY6/KDOnqy/Lj8nTj3qq916e106G9KEUrYVikSzB2tmEZZKqwHBgZukFTNhovBJamdxmbG72N9NUjVPFNUqbpH7L/PF7r0djr0RxQoYctONt0xIueOiJdXYZuwhiwZ68nJyWq1qnZuGMMlpbo/22DNG04FoqtqO1X3v++rXHr7HVFALNTc0Wtjx/SwXUvGuiY/w6J2bhjDJaVad3QGr1O1M1m0q+oecfxpX+LS2++IgkrYusKOqEN0wlYhdiwZ6/7+/qY+ExBnQ0NDW7ZsyaudgkvChamdBsYjd7C2etWqATKsUvXEebH7dl/izD7w/rynVj64PMo2r1009b+Z0B3/7r1bnn78Qfz0jrfoiAJigYhMImGbloipQ6yE3RrWqGIHBwfVTgYDzZs2bdqwYcOuXbvUocyGC0uu+O2R21gHqbom11/6xeWLYmCnr28ezlg/uWLZuqcfMP786iUP/+qXMwbrrevvxV/pykcfyo1sxAIRUQm7FluHmJzlWgLWeK+v1+tqp1UzTO/cuVMdysNwYQnVEdPsYW0qkGkzWZS96okL4twrvrh5OGP93ov3hA/OGKzhr69blCfZiAUionrYvOjo1SESazu+liVgjfo14438BTENw4UllNfOsDlVw7kHElWBHHvKFzcPbwrr65/Nmfh47viOuZM7b7KPN+vff9qV+Dz4FU7AaTjZ+1VrnifZiAXXITRxDNchHEqdsDnQtK0sAetqtZqltVcc0zBcWEKLhsfsYG0X1nK1nCeLeL8bPysOLvXFzcNTYn398znf/ns+ihMqupcvR4ny2tpF1W3zcI592t7Nd/IJtq17ejEA5RPA6P4tC55auUz9bvnyTX/4+ch/b+bfsmP31T/+DC/BJ6BA2te9IBe4cyMbsUBEqA6pOA1sdYtINqwrlUrL88VCmYbhwhKWG50xW1hzYX1VFtamB3LpjNj7U1/cPDwN1mB6X/ed4Aw47ti48MTb8z95deGaJ5aufeqBF9YsDmP9xrpF2166m/2FZxYbrIEmjuCEDc/df+iNO/B3gl1Q+/vVSwa3zeNn6H9/3rOrluIgfoUTcBpOxkt/uPGuG4hsxAIRCfoh3i0iCW2+BKz7+vpauw3VMI2fXybZ2NiYelgzhgvD5amdSLMHHMaa5otWYX3plNilAp+vp8Gad9f/bvHoRyrpwq/svGnLnwmRMNant95mTsMzG6xPbp2/4pGHPnjpnmkL0L7/3AKOMasDtXgePBt2cdCcgJPxkNWPLfvuvVvNwTgf2X7z9pfvbuxgOivZiMWl0055HTdrtKOsLQHr3t5etdWkdXd3g+mU1vKrJDzQHrCH9bSeL6J0u9JLZRywLuZO1DRYf/r3hcDx3Ls+VYAPtKXEGtRuXX8fkK1uc0oOvBUgEz/35JLh7TeDs1UrlmEXB+1z8BA88KONyV8UcXrrfFxASsMYvYen9i4xdoriohbS3VnjD4V1G7I1rGmsg4UYYO3OF8dOFoQ13vRRWjTGGr9FvXFJ18fGL++86cVn70+JNWfilY/+Ak9lNxPhzzxOjXM8Co6N51Yt9U7402+XPPLwQ/YLxTmy9baX727sj8lsjZ8Z6hBgfVLNGlX3mlfRUzVDiipCYEXX1k0WIVABrtsgPtbnxNgJ+cV5nrg5OAoDxHj35jvtgymxnvh4bmRt3SzW7BfevTUOa/Z31t87/UkC1onOtXU2pudQLID1+DmnGcIfLEAEM2KdZcoIK5TsZqaMXIFYWAfdvQoJh0k3sC5myogCAxMyG0R4cUXI86uX1D78sfmt51yEYD7qFSF5eT5MwxELRATppgisMzb4YMWRnbbBRwOOw3qIsJ6Q3T2IeHCJL25mH/to7l/XLIZjwz7uYc27mDLaRIanjBLce9c88aBpa8AN1tiOnDLieXZsXDi0nQpuzujelBGIn9o6/8stC+xHteC5MQ0/sMTFmnt8unWtsIa3hHX25RhYQWSnWo5pgLW6cc/C+uiTvrjZ/ONXFuLtHpH2Vs7hvHjOBQNqA7vBt/1l6ruFG3xn37nttbXUbH7rhfts/myswT03+HDkwOt3nHh7/p7Nd2Ibj8Lzc4bmBh8qaTwQL3TsX7cjx2PX68M063kyDUcsEBFqXQNr07oOYy0TdrNY57J4DjNk53hPSKrFczNgD+ugtpZFCNfWZzb44mZzcINIJxpXFGAOkAFlPggQveUYlB+Ar3vtIq8Et7GGg2xvOQZ/Qnhmu+rwlmPwtHgTmAhV9umd7wnJjWn4mZck1o2LEDjTrKOsLQFrvNHncqsTDGR3d3fjp9rPbMm3OtkDZhUgR2QnBPJhgtL/gS9uNgdwKC1QYHjHjTP3dqGc1+K5eZ7LO2+ygbYdfyo4AX4t8yoMaMZIc2MajliYTojCOr9OCCyvG1PzNVxS8o2p9oA9rKd133rSavCNfiN2z/f1zeAtYF06OaKAWFySfWtEhxp85mMyefStYahfE97rfwjDJSUU1jB7wKq8thfPQ8sxo8fE0VW+xBn88Js/2bHxrtH4vgROQCk88EEhjcUOdkQBsVBY9+a/ygjr4A992QMOY+0snvfQUu3YcfpScU/i0tvviAJiQYvnPXLxnL8QJ1esYZ36EV17wNFY688QQL7xM2LsW1E/IvY7y4Glt9uhP6JA80XrVidqg9h38OWBNd7xO/ILFewBK6xRXluf+DI9PiqvZTNk9Kg4vd4XuvR2+um/ifpRa4nR7e4hdtdjunu0rSwV1rBKpQO//obHrIatsYYoKmFbs0a7vK5/LfY6C92lt8+hPPSnCkQX1tQG4fuc5HzxWjzWlqXFeqJDv6zMHjaTHfT4Qh87v6TrkDMv+XKX3h6H8lSBfNv0zdaupcUaBp5+8JYILqC5vy4zbHJO2LK8pjoEWFtL6Hi/4+716Dei/pU4tMxXvPSiHZpDeejvVSDmq0LChXVUqoY1gXVHfhGwGrONNZzXGt1P6eL9jj5MIPsh9cPye3CyLlKU3ox3keZQXvVAvM/n6vXFFBUIrAmsYXj3H+ysr21XYzZYWwmb6xD7o1/8iUaTsPNeSy+9kUNtk6oxfecvmKTvuna/TSFYNs8Pa1iH/ZMNNWY9eBtr0w/hVXRabjQJW1bYIwfLfxzTJofOUFtV1TJVq8mivBXE9EDCFUheWMNqHfQvkRTNZvyMtTtx5IStvgRHVtiqJXKY/ivmkZV+DErP16EwdK5/rVYWVVWtU7U9WYxL1bTtWCtYwwAZ0mcbqhG8BF6oRabZ1LCNBHEJ21pxpKWZE9Q9xdviyJfiaEl2YQ5toTB0pl61WYLp0309czNqqsVFYy1iDUNJgGK30BkknhwvkekffLGxBF7CDhrYJmHr702lHjaXIkdFDWTvF8fKr5wswKEqtIXCxDSXH+aWPfl/Nuyq2pssckyjmIa1jjUME7jejvjn0A7WhmwrYQdLM9zDvqhWZ6grckTUDpH6tPpY9kby8i7Sk5g+JEtqvf5i/ysC0wAJV9UcULURYZmwhiGhDknLcQ0ST8XPmedbAQuhtNAJ21masUsRuTqD+TgV2RbZfe8W9M1Ps8uhIZQ0TENh+u6Ec3r9ZdCaKcZU1RxNtRFhWbFmQ06tVCqY2GWEGw/Hk+Cp8knStnlamIRtlyJ4yyOyh+RyOhfZZy2yZZ09vJfSzN4FfqhKT+PQDepBQyhJtYdkmqaJZ1VJTbdWyztAzEyRPgvTXKqG5YM1G8qGgYGBarWKjaY+eYCT8RA8EA8vqKRRKgSK6IRtlyLT/L+RTJHdq8hGLqFqhGeQB8TIPjG0W5xaJ/Ylf1lM6cqhFRSDblCP+h5cT8s8zUyrjp4uqRGLuPLD9hjLE2u2ycnJWq3W39+P2V69XkfeRQ4GuKZtgg3s4iB+hRNwGk7GQ1L904yWLRDCiKLJtksRU2TbZHM1wjPI+mFZkMi0PfSFOP8PcWSF+KL8eEuMQxnoA5WglUrSKDwO6zmirj2Yaa+kbqn8YMsfa2MAF6kXvCINo67o6+vDFBCGDeziIH6FEzLWLWmNhWBRfLK9UgRFtkU23hkv8wzytLxz9ZhQBQnS9n4J926KWc9b4uRacfg34sD9Ys8dYtfNs29+2UWjxtihAHSAGtAEykAfAhqV9EFqTkM9StInSE+aI+p2nmHaLqmp+xEqPzh8Da1ArG9EUzQbsiGWJpsSg0e2rEaozpbLNBMXZD9bpm1aXT9CQRo56PNd3SWqn0v/TFQ/FYOf0k/a+GRmejBGjJcHvsuhGRkaKqlK+hipR4XHGbmUKJddVO3RgGmNtZ2SGtosxxrOWGuy+RYoh+xh1RshslGQnJdwn5RwI3NzWfIVpSLF9z4KJ1G+R4IuWWevziA3gyLnYe5RA4cCRPMB0oRoliWHAvqkvOOUkzQKD933gM4e04S1y7QTtRJrz4xAiWRTnc29Ee5nc0Gi4aabs5G5T9BbKiVvyTfyNyF+SFPOjnQFR6RnpPPo5EiJY4wdKKPYYJq/USUHtIJi41xJ6yTNhccU9z1QT6fL07SbYLMPa5iSJp5sghtk694Ik00FCdJ2xYEbmZtqbiRvyTcjPgrE4ahSEFp2hHlGuhkgHOMFxwZlLqBB82lZcsgMTUCjkq7IJM2Fh7yXGjoHc8SYPG2ClcJmJdawsFg22cEMElrrgiQW7guS77MSceRvOFMOx9sus+66inpnesQoMEw4DxllBlCW1TN17kAz9HGBVrNDJGlTeJi7PkJ52kRKbaSy2Y016xVJNnf9qJ/NpTanbQ9uOZtUfF+0ED8nKWfQEV2Z0WeeE7hygDxGghg1Bjg2KF/UNHPJoTO0qqQ5ScvCg9dcqJeXA9Ow2Yo1zFYtgmzTz2ayZdpG/efAjblOVfON/C0Rx0wIsSRn0CMdUe9c98ainSEmjjEXZJQNzUjP0MpkaADtJmnFtFY+kmnaTmuzGGtYoJdHtpW2VUESB3dN8438bRBnyhn0xo7wd4p7Vx52HrIcPnQgNTTNlJ410GpqyEDzIqKXpLMyDZvdWMMC1RqQreeRqiaRcE8D7ksW3wZxTTmDTolKBnhGOo+OB0hDxsCZY4Oyl55doMljmHbC0RzTsFmPNSzQzpUyIFvCraptk7k9vjGtRPA05Qw6/QTrDZwJ6Aj3rtxye7zkzDG7SzN5EtDwbEzDSqylGQVJRFtTltuCm1zzrZI38y0RZ8qpSpGgk5sAxzi1xjvBvct2XA+WBs41hvEwzR7Q8Hig6UgrVmLtWqCmpWwC3DJ/B4izM+ia9ZnvZryWCKSJppnkYpo9oDXTDLQtewYrsXYt0DSksg83XAaJomUhzs6gs9uRnpGuhqkJtj2aZrgFNDysdhYT4v9haJg7+ovAPgAAAABJRU5ErkJggg==');*/
  background-position: 525px 7px;
  background-size: 199px auto;
  background-repeat: no-repeat;
}

.quiz-footer-progress-description {
  display: block;
  margin-bottom: var(--space-xs);
}

.quiz-footer-progress-title {
  font-size: var(--space-m);
  color: var(--color-1);
}

.quiz-footer-progress-value {
  font-size: var(--font-size-s);
  font-weight: bold;
  color: var(--color-6);
  margin-left: var(--space-xs);
}

.quiz-footer-progress {
  display: block;
  width: 50%;
  background-color: var(--color-3);
  border-radius: var(--space-xs);
}

.quiz-footer-progress-line {
  display: block;
  height: var(--space-xs);
  transition: 1s width;
  border-radius: var(--space-xs);
  background-color: var(--color-7);
  background-size: 23px 22px;
  background-image: repeating-linear-gradient(-45deg, rgba(255, 255, 255, .35), rgba(255, 255, 255, .35) var(--space-s), rgba(255, 255, 255, 0) 9px, rgba(255, 255, 255, 0) var(--space-l));
  animation: quiz-footer-progress 1s linear infinite;
}

@keyframes quiz-footer-progress {
  from {
    background-size: 23px 22px;
  }
  50% {
    background-size: 23px var(--space-xxl);
  }
  to {
    background-size: 23px 44px;
  }
}

.quiz-footer-buttons {
  position: absolute;
  top: var(--space-l);
  right: var(--space-xl);
  text-align: right;
}

.quiz-footer-prev,
.quiz-footer-next {
  position: relative;
  display: inline-block;
  height: 42px;
  line-height: 42px;
  border-radius: 50px;
  color: var(--color-9);
  vertical-align: top;
  text-align: center;
  box-shadow: none;
  cursor: pointer;
  border: 1px solid transparent;
}

.quiz-footer-prev {
  width: 42px;
  border: 1px solid var(--color-8);
  margin-right: var(--space-l);
}

.quiz-footer-next {
  overflow: hidden;
  padding: 0 var(--space-m) 0 var(--space-xl);
  background-color: var(--color-7);
  border: 1px solid var(--color-7);
}

.quiz-footer-next:after {
  content: "";
  position: absolute;
  top: -50%;
  bottom: -50%;
  width: 45px;
  left: -65%;
  pointer-events: none;

  background: linear-gradient(90deg, hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .6) 100%);
  transform: skewX(-22deg);
  animation-name: quiz-footer-next;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes quiz-footer-next {
  60% {
    left: 100%
  }
  to {
    left: 130%
  }
}

.quiz-footer-icon {
  display: inline-block;
  vertical-align: middle;
  fill: var(--color-9);
  width: var(--space-xl);
  height: var(--space-xl);
}

.quiz-footer-prev .quiz-footer-icon {
  fill: var(--color-2);
  margin: 0 -12px;
}
</style>
