interface AuthorCardProps {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

export const AuthorCard = ({ name, title, imageUrl, bio }: AuthorCardProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-md p-8 my-8">
      <div className="flex flex-col items-center text-center">
        {/* Hero-style image */}
        <div className="w-32 h-32 mb-6 ring-4 ring-white">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Name and title */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-purple-700 font-medium">{title}</p>
        </div>

        {/* Bio */}
        <p className="text-gray-700 leading-relaxed text-left max-w-3xl">
          {bio}
        </p>
      </div>
    </div>
  );
};
