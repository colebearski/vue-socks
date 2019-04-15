Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },

  template: ` <ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>`
});

Vue.component("product", {
  // receiving the premium props from data
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: ` <div class="product">
  <div class="product-image">
    <img v-bind:src="image" alt="Socks" />
  </div>

  <div class="product-info">
   
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <p>
      For more information, click
      <a v-bind:href="link" target="_blank">here</a>.
    </p>
    
    <p v-if="inStock">In Stock</p>

    <p class="saleItem">{{ onSale }}</p>

    <p v-else :class="{ outOfStock: !inStock}">Out of Stock</p>
    
    <p>Shipping: {{ shipping }}</p>

    <product-details :details="details"></product-details>
    <div
      v-for="(variant, index) in variants"
      v-bind:key="variant.variantId"
      class="color-box"
      v-bind:style="{backgroundColor: variant.variantColor}"
      v-on:mouseover="updateProduct(index)"
    >
    </div>

    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock}"
    >
      Add to Cart
    </button>
    <button v-on:click="removeFromCart">Remove Item</button>

    <div class="cart">
      <p>Cart({{ cart }})</p>
    </div>
  </div>
</div>`,

  data() {
    return {
      brand: "Vue Mastery",
      product: "Socks",
      selectedVariant: 0,
      description: "These socks are the bees knees.",
      link: "//google.com",
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      sizes: ["Small", "Medium", "Large"],
      variants: [
        {
          variantId: 2234,
          variantColor: "Green",
          variantImage: "./assets/images/vmSocks-green-onWhite.jpg",
          variantQuantity: 10,
          onSale: true
        },
        {
          variantId: 2235,
          variantColor: "Blue",
          variantImage: "./assets/images/vmSocks-blue-onWhite.jpg",
          variantQuantity: 0,
          onSale: false
        }
      ],
      cart: 0
    };
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    removeFromCart: function() {
      this.cart -= 1;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    onSale() {
      if (this.variants[this.selectedVariant].onSale) {
        return this.brand + " " + this.product + " are on sale!";
      } else {
        return this.brand + " " + this.product + " are NOT on sale!";
      }
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "$2.99";
    }
  }
});

const app = new Vue({
  el: "#app",
  // this data will get passed to our component as a prop
  data: {
    premium: false
  }
});
