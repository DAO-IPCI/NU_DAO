<template>
  <div id="animation-scene">
    <div id="animation-scene--content">
      <div class="animation-dino--red">
        <div class="sprite-basic-dino-red-body"></div>
        <div class="sprite-basic-dino-red-fire"></div>
        <div class="sprite-basic-dino-red-hand left"></div>
        <div class="sprite-basic-dino-red-hand right"></div>
      </div>
      <div class="animation-scales" :class="dir == 'left' ? 'animation-red' : 'animation-green'">
        <div class="sprite-basic-scales-part1"></div>
        <div class="sprite-basic-scales-part2"></div>
        <div class="animation-scales--move">
          <div class="animation-scales--red">
            <div class="sprite-basic-scales-red-top"></div>
            <div class="sprite-basic-scales-red-action"></div>
            <div class="sprite-basic-scales-red-bottom"></div>
          </div>
          <div class="animation-scales--green">
            <div class="sprite-basic-scales-green-top"></div>
            <div class="sprite-basic-scales-green-action"></div>
            <div class="sprite-basic-scales-green-bottom"></div>
          </div>
          <div class="sprite-basic-scales-part3"></div>
        </div>
      </div>
      <div class="animation-dino--green">
        <div class="sprite-basic-dino-green-body"></div>
        <div class="sprite-basic-dino-green-brows"></div>
        <div class="sprite-basic-dino-green-leaf"></div>
        <div class="sprite-basic-dino-green-hand"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dir: {
      type: String,
      default: "right"
    }
  },
  mounted() {
    const $wrap = document.querySelector("#animation-scene");
    const $content = document.querySelector("#animation-scene--content");
    const ratio = ($wrap.offsetWidth / $content.offsetWidth).toFixed(2);
    $content.style.transform = "scale(" + ratio + ")";
  }
};
</script>

<style scoped>
.sprite-basic-dino-green,
.sprite-basic-dino-green-body,
.sprite-basic-dino-green-brows,
.sprite-basic-dino-green-hand,
.sprite-basic-dino-green-leaf,
.sprite-basic-dino-red,
.sprite-basic-dino-red-body,
.sprite-basic-dino-red-fire,
.sprite-basic-dino-red-hand,
.sprite-basic-scales-green,
.sprite-basic-scales-green-action,
.sprite-basic-scales-green-bottom,
.sprite-basic-scales-green-top,
.sprite-basic-scales-part1,
.sprite-basic-scales-part2,
.sprite-basic-scales-part3,
.sprite-basic-scales-red,
.sprite-basic-scales-red-action,
.sprite-basic-scales-red-bottom,
.sprite-basic-scales-red-top {
  background-image: url("../../../public/assets/i/sprite.svg?6");
}

.sprite-basic-dino-green {
  width: 163.3px;
  height: 225.1px;
  background-position: 0px 0px;
  display: inline-block;
}

.sprite-basic-dino-green-body {
  width: 163.3px;
  height: 225.1px;
  background-position: -164px 0px;
  display: inline-block;
}

.sprite-basic-dino-green-brows {
  width: 26.3px;
  height: 28.2px;
  background-position: -328px 0px;
  display: inline-block;
}

.sprite-basic-dino-green-hand {
  width: 36.3px;
  height: 16.7px;
  background-position: -355px 0px;
  display: inline-block;
}

.sprite-basic-dino-green-leaf {
  width: 37.7px;
  height: 40.8px;
  background-position: -392px 0px;
  display: inline-block;
}

.sprite-basic-dino-red {
  width: 245px;
  height: 225px;
  background-position: -430px 0px;
  display: inline-block;
}

.sprite-basic-dino-red-body {
  width: 183.5px;
  height: 225px;
  background-position: -675px 0px;
  display: inline-block;
}

.sprite-basic-dino-red-fire {
  width: 102.3px;
  height: 46.7px;
  background-position: -859px 0px;
  display: inline-block;
}

.sprite-basic-dino-red-hand {
  width: 22.6px;
  height: 16.4px;
  background-position: -962px 0px;
  display: inline-block;
}

.sprite-basic-scales-green {
  width: 97.6px;
  height: 144.1px;
  background-position: -985px 0px;
  display: inline-block;
}

.sprite-basic-scales-green-action {
  width: 49.7px;
  height: 58px;
  background-position: -1083px 0px;
  display: inline-block;
}

.sprite-basic-scales-green-bottom {
  width: 93.9px;
  height: 28.8px;
  background-position: -1133px 0px;
  display: inline-block;
}

.sprite-basic-scales-green-top {
  width: 97.6px;
  height: 116.8px;
  background-position: -1227px 0px;
  display: inline-block;
}

.sprite-basic-scales-part1 {
  width: 17.6px;
  height: 45.4px;
  background-position: -1325px 0px;
  display: inline-block;
}

.sprite-basic-scales-part2 {
  width: 26.9px;
  height: 26.9px;
  background-position: -1343px 0px;
  display: inline-block;
}

.sprite-basic-scales-part3 {
  width: 220.6px;
  height: 3px;
  background-position: -1370px 0px;
  display: inline-block;
}

.sprite-basic-scales-red {
  width: 97.6px;
  height: 144.1px;
  background-position: -1591px 0px;
  display: inline-block;
}

.sprite-basic-scales-red-action {
  width: 30.1px;
  height: 56.3px;
  background-position: -1689px 0px;
  display: inline-block;
}

.sprite-basic-scales-red-bottom {
  width: 93.9px;
  height: 28.8px;
  background-position: -1720px 0px;
  display: inline-block;
}

.sprite-basic-scales-red-top {
  width: 97.6px;
  height: 116.8px;
  background-position: -1814px 0px;
  display: inline-block;
}

.animation-scales,
.animation-dino--red,
.animation-dino--green {
  visibility: hidden;
  opacity: 0;
}

@keyframes FadeOut {
  0% {
    visibility: visible;
    opacity: 1;
  }
  100% {
    visibility: hidden;
    opacity: 0;
  }
}
@keyframes FadeIn {
  0% {
    visibility: hidden;
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}
@keyframes SwingLeft {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(-5deg);
  }
}
@keyframes SwingRight {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
@keyframes SwingScaleIn {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.1);
  }
}
@keyframes SwingScaleOut {
  0% {
    transform: scale(0.8);
  }
  25% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  75% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
@keyframes Glitch {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  15% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  45% {
    opacity: 0;
  }
}
@keyframes Shake1 {
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(-10deg);
  }
  15% {
    transform: rotate(10deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(10deg);
  }
  35% {
    transform: rotate(-10deg);
  }
  45% {
    transform: rotate(0deg);
  }
}
@keyframes Shake2 {
  0% {
    transform: rotate(20deg);
  }
  5% {
    transform: rotate(30deg);
  }
  15% {
    transform: rotate(-10deg);
  }
  20% {
    transform: rotate(30deg);
  }
  30% {
    transform: rotate(-10deg);
  }
  35% {
    transform: rotate(30deg);
  }
  45% {
    transform: rotate(0deg);
  }
}
@keyframes Brows {
  0% {
    transform: translateY(0px);
  }
  5% {
    transform: translateY(-3px);
  }
  15% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-3px);
  }
  30% {
    transform: translateY(0);
  }
  35% {
    transform: translateY(-3px);
  }
  45% {
    transform: rotate(0deg);
  }
}
@keyframes Leaf {
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(-4deg);
  }
  15% {
    transform: rotate(4deg);
  }
  20% {
    transform: rotate(-4deg);
  }
  30% {
    transform: rotate(4deg);
  }
  35% {
    transform: rotate(-4deg);
  }
  45% {
    transform: rotate(0deg);
  }
}
/* SCENE */
#animation-scene--content {
  display: inline-block;
  white-space: nowrap;
  transform-origin: 0 0;
}

.animation-dino--red,
.animation-dino--green,
.animation-scales {
  display: inline-block;
  vertical-align: middle;
}

/* PARTS */
.animation-scales {
  position: relative;
  width: 220.6px;
  height: 202.95px;
  margin-left: 78.8px;
  margin-right: 78.8px;
  animation: 0.2s FadeIn 0.4s ease-in forwards;
}

.sprite-basic-scales-part1 {
  position: absolute;
  top: 0;
  left: 50%;
  left: calc(50% - 17.6px / 2);
  z-index: 1;
}

.sprite-basic-scales-part2 {
  position: absolute;
  top: 45.4px;
  left: 50%;
  left: calc(50% - 26.9px / 2);
  z-index: 1;
}

.animation-scales--move {
  position: absolute;
  width: 220.6px;
  height: 3px;
  top: 57.35px;
  left: 50%;
  left: calc(50% - 220.6px / 2);
  z-index: 0;
  transform-origin: 50% 50%;
}

.sprite-basic-scales-part3 {
  position: absolute;
  top: 0;
  left: 0;
}

.animation-scales--red {
  position: absolute;
  top: -3px;
  left: -47.8px;
  width: 97.6px;
  height: 144.1px;
  z-index: 2;
}

.sprite-basic-scales-red-top {
  position: absolute;
  top: 0;
  left: 50%;
  left: calc(50% - 97.6px / 2);
  z-index: 1;
}

.sprite-basic-scales-red-action {
  position: absolute;
  top: 60.5px;
  left: 50%;
  left: calc(50% - 30.1px / 2);
  z-index: 0;
  transform-origin: 50% 100%;
}

.sprite-basic-scales-red-bottom {
  position: absolute;
  top: 115.8px;
  left: 50%;
  left: calc(50% - 93.9px / 2);
  z-index: 0;
}

.animation-scales--green {
  position: absolute;
  top: -3px;
  right: -47.8px;
  width: 97.6px;
  height: 144.1px;
  z-index: 2;
}

.sprite-basic-scales-green-top {
  position: absolute;
  top: 0;
  left: 50%;
  left: calc(50% - 97.6px / 2);
  z-index: 1;
}

.sprite-basic-scales-green-action {
  position: absolute;
  top: 58.8px;
  left: 50%;
  left: calc(50% - 49.7px / 2);
  z-index: 0;
  transform-origin: 50% 100%;
}

.sprite-basic-scales-green-bottom {
  position: absolute;
  top: 115.8px;
  left: 50%;
  left: calc(50% - 93.9px / 2);
  z-index: 0;
}

.animation-dino--red {
  position: relative;
  width: 245px;
  height: 225px;
  animation: 0.2s FadeIn 1.2s ease-in forwards;
}

.sprite-basic-dino-red-body {
  position: absolute;
  top: 0;
  left: 0;
}

.sprite-basic-dino-red-fire {
  position: absolute;
  top: 67px;
  right: 0;
  opacity: 0;
  animation: 2.5s Glitch 1.2s ease-out infinite;
}

.sprite-basic-dino-red-hand.left {
  position: absolute;
  top: 132px;
  left: 75px;
  transform-origin: 0 0;
  animation: 2.5s Shake1 1.2s ease-out infinite;
}

.sprite-basic-dino-red-hand.right {
  position: absolute;
  top: 129px;
  left: 102px;
  transform: rotate(20deg);
  transform-origin: 0 0;
  animation: 2.5s Shake2 1.2s ease-out infinite;
}

.animation-dino--green {
  position: relative;
  width: 220px; /*163.3px;*/
  height: 225.1px;
  animation: 0.2s FadeIn 1.2s ease-in forwards;
}

.sprite-basic-dino-green-body {
  position: absolute;
  top: 0;
  left: 0;
}

.sprite-basic-dino-green-brows {
  position: absolute;
  top: 34px;
  left: 18px;
  animation: 2.5s Brows 1.2s ease-out infinite;
}

.sprite-basic-dino-green-leaf {
  position: absolute;
  top: 117px;
  left: 4px;
  transform-origin: 100% 100%;
  animation: 2.5s Leaf 1.2s ease-out infinite;
}

.sprite-basic-dino-green-hand {
  position: absolute;
  top: 148px;
  left: 28px;
}

.animation-scales.animation-red .animation-scales--move {
  animation: 2.5s SwingLeft 0.4s cubic-bezier(0.8, 0.28, 0.7, 1) forwards;
}
.animation-scales.animation-red .animation-scales--green,
.animation-scales.animation-red .animation-scales--red {
  animation: 2.5s SwingRight 0.4s cubic-bezier(0.8, 0.28, 0.7, 1) forwards;
}
.animation-scales.animation-red .sprite-basic-scales-red-action {
  animation: SwingScaleIn 2.5s 0.4s linear forwards;
}
.animation-scales.animation-red .sprite-basic-scales-green-action {
  transform: scale(0.8);
  animation: 2.5s SwingScaleOut 0.4s linear forwards;
}

.animation-scales.animation-green .animation-scales--move {
  animation: 2.5s SwingRight 0.4s cubic-bezier(0.8, 0.28, 0.7, 1) forwards;
}
.animation-scales.animation-green .animation-scales--green,
.animation-scales.animation-green .animation-scales--red {
  animation: 2.5s SwingLeft 0.4s cubic-bezier(0.8, 0.28, 0.7, 1) forwards;
}
.animation-scales.animation-green .sprite-basic-scales-green-action {
  animation: 2.5s SwingScaleIn 0.4s linear forwards;
}
.animation-scales.animation-green .sprite-basic-scales-red-action {
  transform: scale(0.8);
  animation: 2.5s SwingScaleOut 0.4s linear forwards;
}
</style>
