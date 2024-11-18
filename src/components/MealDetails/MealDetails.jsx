import { useState, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaArrowRight, FaEye, FaHeart } from "react-icons/fa6";

import { BiSolidLike } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { MdRateReview } from "react-icons/md";
import moment from "moment";
import useScrollToTop from "../../hooks/useScrollToTop";
import Loading from "./../Loading/Loading";

export default function MealDetails() {
  useScrollToTop();
  const [loading, setLoading] = useState(true);
  const [singleMeal, setSingleMeal] = useState([]);
  const { mealId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://juborajsujon.github.io/personal-project-api/meal2.json"
        );
        const data = await res.json();

        const result = data.filter((item) => {
          return item._id === Number(mealId);
        });
        setSingleMeal(result[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [mealId]);

  const {
    meal_title,
    price,
    serve_amount,
    admin,
    prep_time,
    cooking_time,
    total_time,
    distributor_name,
    image,
    meal_category,
    meal_subcategory,
    meal_ingredients,
    nutrition_facts,
    post_createdAt,
    post_updatedAt,
    short_description,
    rating: mealRating,
    likes_count,
  } = singleMeal || {};

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="px-4 py-20 sm:py-5">
      {/* main content */}
      <div className=" text-2xl md:text-3xl font-bold">
        <h2>{meal_title} Details</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
        {/* left side */}
        <div className="min-w-96 w-full">
          {/* Meal Image */}
          <div className="overflow-hidden w-full">
            <img
              className="w-full max-h-[70vh] object-cover"
              src={image}
              alt={meal_title}
            />
          </div>

          {/* Post Details */}
          <div className="py-6">
            <div className="">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-300">
                Admin Name : {admin.name}
              </h3>
              <h4>
                <span className="font-semibold">Admin Email</span> :{" "}
                {admin.email}
              </h4>
              <h4>
                <span className="font-semibold">Post Date :</span>{" "}
                {moment(post_createdAt).fromNow()}
              </h4>
              <h4>
                <span className="font-semibold">Last Updated Date :</span>{" "}
                {moment(post_updatedAt).fromNow()}
              </h4>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="lg:pr-16">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-300">
              {meal_title}
            </h2>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-300 mr-3">
              ${price}
            </h3>
          </div>
          <p className="text-base font-medium text-slate-900 dark:text-slate-300">
            <span className="text-slate-400 text-base mr-2">by</span>
            {distributor_name}
          </p>

          {/* Meal Name, Price, Review and Rating */}
          <div className="flex items-center gap-2 ">
            {/* Rating - read only */}
            <p>Rating: {mealRating.averageRating || 0}</p>

            <span> | </span>

            {/* review - read only */}
            <span className="text-slate-800 dark:text-slate-300 text-base leading-10">
              {mealRating.reviewCount || 0} reviews
            </span>
          </div>

          {/* category and sub-category and serve amount */}
          <div className="py-5">
            <h4>
              <span className="font-semibold">Category : </span> {meal_category}
            </h4>
            <h4>
              <span className="font-semibold">Sub-Category : </span>{" "}
              {meal_subcategory}
            </h4>
            <h4>
              <span className="font-semibold">Serve Amount : </span>{" "}
              {serve_amount}
            </h4>
          </div>

          {/* cooking time and prep time and total time */}
          <div className="flex gap-16 items-center justify-start">
            <p className="text-sm text-slate-900 dark:text-slate-300 items-center justify-center flex flex-col">
              <span className="font-medium">Prep.Time</span>{" "}
              <span>{prep_time}</span>
            </p>
            <p className="text-sm text-slate-900 dark:text-slate-300 items-center justify-center flex flex-col">
              <span className="font-medium">cooking Time</span>{" "}
              <span>{cooking_time}</span>
            </p>
            <p className="text-sm text-slate-900 dark:text-slate-300 items-center justify-center flex flex-col">
              <span className="font-medium">Total Time</span>{" "}
              <span>{total_time}</span>
            </p>
          </div>

          {/* Food Ingredients and Description */}
          <div className="dark:text-slate-300 space-y-3 mt-6">
            <p>{short_description}</p>
            <ul className="*:mb-1">
              <h4 className="text-lg font-medium underline decoration-orange-300">
                Food Ingredients
              </h4>

              {meal_ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  {" "}
                  <FaArrowRight className="text-orange-600" size={18} />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Page Action Buttons section  */}
          <div className="text-center flex justify-start mt-10 gap-6">
            <button className="btn bg-slate-400   hover:text-slate-900 dark:text-slate-900 hover:bg-slate-500 text-base">
              Meal Request
            </button>

            <ul className="flex flex-wrap justify-start items-center gap-4">
              <li className="flex cursor-pointer items-center gap-2">
                <BiSolidLike size={24} className="text-blue-600" />
                <span>{likes_count}</span>
              </li>
              <li className="flex cursor-pointer items-center gap-2">
                <MdRateReview size={24} className="text-slate-600" />
                <span>Review</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                <FaHeart size={24} className="text-red-600" />
                <span>Save</span>
              </li>

              <li className="flex cursor-pointer items-center gap-2">
                <FaShareAlt />
                <span>Share</span>
              </li>
            </ul>
          </div>

          {/* Nutrition Facts */}

          <div className="mt-10 md:mt-16">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-300">
              Nutrition Facts
              <span className="text-slate-400 text-base ml-2">
                {" "}
                (per serving)
              </span>
            </h3>
            <div className="border border-slate-200 px-4 py-2 rounded-md mt-6">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <h4 className="text-xl font-medium text-slate-900 dark:text-slate-300">
                    {nutrition_facts.calories}
                  </h4>
                  <p className="text-slate-900 dark:text-slate-300">Calories</p>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-medium text-slate-900 dark:text-slate-300">
                    {nutrition_facts.fats}
                  </h4>
                  <p className="text-slate-900 dark:text-slate-300">Fat</p>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-medium text-slate-900 dark:text-slate-300">
                    {nutrition_facts.carbs}
                  </h4>
                  <p className="text-slate-900 dark:text-slate-300">Carbs</p>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-medium text-slate-900 dark:text-slate-300">
                    {nutrition_facts.protein}
                  </h4>
                  <p className="text-slate-900 dark:text-slate-300">Protein</p>
                </div>
              </div>
            </div>
          </div>

          {/* People are viewing this right now */}
          <div className="mt-4">
            <p className="text-slate-900 dark:text-slate-300 flex items-center gap-2">
              <FaEye className="text-orange-400" />
              <span className="text-orange-400">1,000</span> People are viewing
              this right now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
