import search from "../assets/search.svg";
type SearchBarProps = {
  debouncedHandlChange: (e: any) => void;
};
export const SearchBar: React.FC<SearchBarProps> = ({
  debouncedHandlChange,
}) => {
  return (
    <div className="w-1/2 md:w-1/3 flex items-center">
      <img src={search} alt="search" className="absolute w-4 md:w-5" />
      <input
        className="border-b border-stone-200 rounded bg-stone-50 focus:outline-none px-5 py-2 mb-4 mt-5 text-xs md:text-sm w-full pl-10"
        type="text"
        onChange={(e) => debouncedHandlChange(e)}
      />
    </div>
  );
};
