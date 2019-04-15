// Product Review
Vue.component("product-review", {
  // Two way data binding with v-model
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name">
  </p>

  <p>
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>
  </p>

  <p>Would you recommend this product?</p>

  <label>
    Yes
    <input type="radio" value="Yes" v-model="recommend"/>
  </label>

  <label>
    No
    <input type="radio" value="No" v-model="recommend"/>
  </label>

  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </p>

  <p>
    <input type="submit" value="Submit">
  </p>

  </form>

    `,

  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        this.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    }
  }
});

// Product Details
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

// Product
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
    <p v-else :class="{ outOfStock: !inStock}">Out of Stock</p>
    <p class="saleItem">{{ onSale }}</p>

    
    
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

  </div>

  <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
       <li v-for="review in reviews">
        <p>{{ review.name }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>{{ review.review }}</p>
        <p>Recommend: {{ review.recommend }}</p>
       </li>
      </ul>
  </div>

  <product-review @review-submitted="addReview"></product-review>
  
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
      reviews: []
    };
  },
  methods: {
    addToCart: function() {
      // emitting an event
      // passes data back to parent as 'add-to-cart'
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart: function() {
      // passes data back to parent as 'remove from cart'
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
      console.log("Added", id);
    },

    removeItem(id) {
      this.cart.pop(id);
      console.log("Removed", id);
    }
  }
});
