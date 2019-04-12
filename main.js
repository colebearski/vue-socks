const app = new Vue({
  // options object
  // optional properties to store data and perform actions
  // el plugs into the instance where the dom specifies app
  el: "#app",
  data: {
    product: "Socks",
    description: "These socks are the bees knees.",
    image: "./assets/images/vmSocks-green-onWhite.jpg",
    link: "//google.com",
    inStock: true,
    inventory: 10,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    sizes: ["Small", "Medium", "Large"],
    variants: [
      {
        variantId: 2234,
        variantColor: "Green",
        variantImage: "./assets/images/vmSocks-green-onWhite.jpg"
      },
      {
        variantId: 2235,
        variantColor: "Blue",
        variantImage: "./assets/images/vmSocks-blue-onWhite.jpg"
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
    updateProduct: function(variantImage) {
      this.image = variantImage;
    }
  }
});
// wicked
