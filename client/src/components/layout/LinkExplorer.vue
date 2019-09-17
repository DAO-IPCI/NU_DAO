<template>
  <a :href="href" target="_blank" :title="text">{{ label }}</a>
</template>

<script>
import * as utils from "../../tools/utils";

export default {
  props: {
    type: {
      type: String,
      default: "chain",
      validator: val => ["chain", "ipfs"].includes(val)
    },
    text: {
      type: String
    },
    category: {
      type: String,
      default: ""
    },
    isSlice: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    href: function() {
      return this.type === "chain"
        ? utils.urlExplorer(this.text, this.category, 1)
        : utils.urlIpfs(this.text, this.category);
    },
    label: function() {
      return this.isSlice
        ? this.text.slice(0, 6) + "..." + this.text.slice(-4)
        : this.text;
    }
  }
};
</script>
