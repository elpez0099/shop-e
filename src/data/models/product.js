import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
      maxLenght: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price cannot exceed 5 digits"],
    },
    description: {
      type: String,
      required: [true, "Please enter a product descripction"],
    },
    rating: {
        averageRate: {
            type: Number,
            default: 0,
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
        reviews: [{
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: false,
            },
            rating: {
              type: Number,
              required: true,
            },
            comment: {
              type: String,
              required: false,
            },
          }]
    },
    images: [
      {
        public_id: String,
        url: {
          type: String,
          required: true,
        },
        description: {
            type: String,
          required: false,
        }
      },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    seller: {
      type: String,
      required: [true, "Please enter a product seller"],
    },
    stock: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);