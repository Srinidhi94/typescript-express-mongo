import { model, Schema } from "mongoose";

const PostSchema: Schema = new Schema({
    category: String,
    content: {
        default: "",
        required: true,
        type: String,
    },
    createdAt: Date,
    featuredImage: {
        default: "",
        type: String,
    },
    published: Boolean,
    slug: {
        default: "",
        lowercase: true,
        required: true,
        type: String,
        unique: true,
    },
    title: {
        default: "",
        required: true,
        type: String,
    },
    updatedAt: Date,
});

export const Post = model("Post", PostSchema);
