import React from "react";
import { useForm } from "react-hook-form";

const UserReviewForm = () => {
    const { handleSubmit } = useForm();
    const submitReview = () => {
        console.log("review submitted and added to database to update");
    };

    // update database to add another review to the arrays of reviews made on the item being sold
    return (
        <form onSubmit={handleSubmit(submitReview)}>
            {/* add a star rating system */}
            <input type="text" name="name" id="name" />
            <textarea
                name="feedback"
                id="feedback"
                cols="30"
                rows="10"
            ></textarea>
            <button>Submit review</button>
        </form>
    );
};

export default UserReviewForm;
