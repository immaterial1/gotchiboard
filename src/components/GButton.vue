<template>
  <component
    :is="element"
    v-bind="$attrs"
    class="btn cursor"
    :class="{
      'btn-lg': large,
      'theme-primary': theme === 'primary',
      'disabled': disabled,
      'theme-secondary': theme === 'secondary'
    }">
    <slot/>
  </component>
</template>

<script>
export default {
  props: {
    theme: String,
    element: {
      type: String,
      default: () => 'button'
    },
    large: Boolean,
    disabled: Boolean
  }
}
</script>

<style>
.btn {
  border-image-slice: 2;
  border-image-width: 2;
  border-image-repeat: stretch;
  border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
  border-image-outset: 2;
  border-style: solid;
  border-width: 4px;
  position: relative;
  display: inline-block;
  margin: 4px;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  color: #212529;
  background-color: #fff;
}

.btn.btn-lg {
  border-width: 8px;
  margin: 8px;
}

@media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .btn {
    border-image-repeat: space;
  }
}

@supports (-moz-appearance: meterbar) {
  .btn {
    border-image-repeat: stretch;
  }
}

.btn::after {
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  content: "";
  box-shadow: inset -4px -4px #adafbc;
}

.btn.btn-lg::after {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  content: "";
  box-shadow: inset -8px -8px #adafbc;
}

.btn:hover {
  color: #212529;
  text-decoration: none;
  background-color: #e7e7e7;
}

.btn:hover::after {
  box-shadow: inset -6px -6px #adafbc;
}

.btn.btn-lg:hover::after {
  box-shadow: inset -12px -12px #adafbc;
}

.btn:focus {
  box-shadow: 0 0 0 6px rgba(173, 175, 188, 0.3);
}

.btn.btn-lg:focus {
  box-shadow: 0 0 0 12px rgba(173, 175, 188, 0.3);
}

.btn:active:not(.is-disabled)::after {
  box-shadow: inset 4px 4px #adafbc;
}

.btn.btn-lg:active:not(.is-disabled)::after {
  box-shadow: inset 8px 8px #adafbc;
}

.btn:focus {
  outline: 0;
}

.btn.is-disabled, .btn.is-disabled:hover, .btn.is-disabled:focus {
  color: #212529;
  cursor: not-allowed;
  background-color: #d3d3d3;
  box-shadow: inset -4px -4px #adafbc;
  opacity: 0.6;
}
.btn.btn-lg.is-disabled, .btn.btn-lg.is-disabled:hover, .btn.btn-lg.is-disabled:focus {
  box-shadow: inset -8px -8px #adafbc;
}

/*
    PRIMARY
*/
.btn.theme-primary {
  color: #fff;
  background-color: #641FEE;
}
.btn.theme-primary.disabled {
  color: #fff;
  background-color: #422588;
  opacity: 50%;
}

.btn.theme-primary::after {
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  content: "";
  box-shadow: inset -4px -4px #422588;
}
.btn.theme-primary.disabled::after {
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  content: "";
  box-shadow: inset -4px -4px #351C71;
}
.btn.btn-lg.theme-primary::after {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  content: "";
  box-shadow: inset -8px -8px #422588;
}
.btn.btn-lg.theme-primary.disabled::after {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  content: "";
  box-shadow: inset -8px -8px #351C71;
}

.btn.theme-primary:hover {
  color: #fff;
  text-decoration: none;
  background-color: #361e6d;
}
.btn.theme-primary.disabled:hover {
  color: #fff;
  opacity: 100%;
  text-decoration: none;
  background-color: #422588;
}

.btn.theme-primary:hover::after {
  box-shadow: inset -6px -6px #422588;
}
.btn.btn-lg.theme-primary:hover::after {
  box-shadow: inset -12px -12px #422588;
}
.btn.theme-primary.disabled:hover::after {
  box-shadow: inset -6px -6px #351C71;
}
.btn.btn-lg.theme-primary.disabled:hover::after {
  box-shadow: inset -12px -12px #351C71;
}

.btn.theme-primary:focus {
  box-shadow: 0 0 0 6px rgba(46, 25, 94, 0.3);
}
.btn.btn-lg.theme-primary:focus {
  box-shadow: 0 0 0 12px rgba(46, 25, 94, 0.3);
}

.btn.theme-primary:active:not(.is-disabled)::after {
  box-shadow: inset 4px 4px #422588;
}
.btn.btn-lg.theme-primary:active:not(.is-disabled)::after {
  box-shadow: inset 8px 8px #422588;
}
.btn.theme-primary.disabled:active:not(.is-disabled)::after {
  box-shadow: inset 4px 4px #351C71;
}
.btn.btn-lg.theme-primary.disabled:active:not(.is-disabled)::after {
  box-shadow: inset 8px 8px #351C71;
}

/*
    SECONDARY
*/
.btn.theme-secondary {
  color: #fff;
  background-color: #52B4BA;
}

.btn.theme-secondary::after {
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  content: "";
  box-shadow: inset -4px -4px #337275;
}
.btn.btn-lg.theme-secondary::after {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  content: "";
  box-shadow: inset -8px -8px #337275;
}

.btn.theme-secondary:hover {
  color: #fff;
  text-decoration: none;
  background-color: #4ba5aa;
}

.btn.theme-secondary:hover::after {
  box-shadow: inset -6px -6px #337275;
}
.btn.btn-lg.theme-secondary:hover::after {
  box-shadow: inset -12px -12px #337275;
}

.btn.theme-secondary:focus {
  box-shadow: 0 0 0 6px rgba(51, 114, 117, 0.3);
}
.btn.btn-lg.theme-secondary:focus {
  box-shadow: 0 0 0 12px rgba(51, 114, 117, 0.3);
}

.btn.theme-secondary:active:not(.is-disabled)::after {
  box-shadow: inset 4px 4px #337275;
}
.btn.btn-lg.theme-secondary:active:not(.is-disabled)::after {
  box-shadow: inset 8px 8px #337275;
}
</style>
