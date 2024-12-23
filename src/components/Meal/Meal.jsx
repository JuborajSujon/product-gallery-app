import { useEffect, useState } from "react";
import useScrollToTop from "./../../hooks/useScrollToTop";
import MealCard from "./../MealCard/MealCard";
import Loading from "./../Loading/Loading";

export default function Meals() {
  useScrollToTop();
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://juborajsujon.github.io/personal-project-api/meal2.json"
        );
        const data = await res.json();
        setMeals(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(search.toLowerCase());
  };

  const filteredMeals = meals
    .filter(
      (meal) => meal.meal_title.toLowerCase().includes(searchText) // Search by title
    )
    .filter(
      (meal) => (category ? meal.meal_category === category : true) // Filter by category
    )
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") return a.price - b.price;
      if (sortOption === "priceHighToLow") return b.price - a.price;
      if (sortOption === "popularity")
        return b.rating?.averageRating - a.rating?.averageRating;
      return 0;
    });

  return (
    <div className="px-4">
      {/* Meals Filter Section */}
      <div className="">
        <div className="lg:flex justify-between">
          <div>
            <p className="text-xl font-medium text-blue-400 ml-4">
              Total {filteredMeals.length} meals found
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center px-4">
            <div>
              <div className="space-y-2">
                <p className="font-medium">Name</p>
                <form onSubmit={handleSearch}>
                  <label className="input input-bordered flex border-slate-400 items-center gap-2 h-8 min-h-8">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      name="search"
                      className="grow"
                      placeholder="Search"
                    />
                    <button type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-6 h-6 opacity-70">
                        <path
                          fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </label>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="space-y-2">
                  <p className=" font-medium">Category</p>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={category}
                    className="select text-sm border-slate-400 min-w-32 max-w-xs w-full h-8 min-h-8">
                    <option value="">All Meals</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <p className=" font-medium">Price</p>
                  <select
                    onChange={(e) => setSortOption(e.target.value)}
                    defaultValue={sortOption}
                    className="select text-sm border-slate-400 min-w-32 max-w-xs w-full h-8 min-h-8">
                    <option value="">All Price</option>
                    <option value="priceLowToHigh">Low to High</option>
                    <option value="priceHighToLow">High to Low</option>
                    <option value="popularity">Popurarity</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 justify-between">
            {filteredMeals.length === 0 ? (
              <div className="col-span-3 min-h-[calc(100vh-220px)] overflow-x-hidden  flex justify-center items-center">
                <p className="text-center text-2xl font-semibold">
                  NO MEAL FOUND
                </p>
              </div>
            ) : (
              filteredMeals.map((meal) => (
                <MealCard key={meal._id} item={meal} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
