const app = new Vue({
  // options object
  // optional properties to store data and perform actions
  // el plugs into the instance where the dom specifies app
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    selectedVariant: 0,
    description: "These socks are the bees knees.",
    // image: "./assets/images/vmSocks-green-onWhite.jpg",
    link: "//google.com",
    // inStock: true,
    // inventory: 10,
    // onSale: true,
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
    }
  }
});
// wicked
