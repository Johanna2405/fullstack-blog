const DetailView = ({ post, onDelete, onUpdate, backendOffline, error }) => {
  return (
    <div className="flex flex-col justify-center container mx-auto h-full my-10 bg-base-300 p-6 rounded-lg gap-4">
      {/* ⚠️ Warning if backend is offline */}
      {error && (
        <p className="text-red-500 text-center text-xl font-bold">{error}</p>
      )}

      {/* Cover Image */}
      {post.cover ? (
        <div className="w-full h-64 overflow-hidden rounded-lg">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-neutral rounded-lg">
          <p className="text-gray-500">No image available</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2 bg-neutral p-4 items-start rounded-lg">
        <h1 className="text-3xl font-bold">{post.title}</h1>

        {/* Date */}
        <p className="text-sm text-gray-400">
          {new Date(post.date).toLocaleDateString()}
        </p>

        {/* Author */}
        {post.author ? (
          <p className="font-thin">{post.author}</p>
        ) : (
          <p className="">No author information available</p>
        )}
      </div>

      {/* Content */}
      <div className="bg-neutral p-4 rounded-lg">
        <p className="text-lg">{post.content}</p>
      </div>

      {/* Edit & Delete Buttons (deactivated if backend is offline) */}
      <div className="flex justify-end gap-4">
        <button
          className={`btn btn-outline w-24 ${
            backendOffline ? "btn-disabled" : "btn-accent"
          }`}
          onClick={onUpdate}
          disabled={backendOffline}
        >
          Edit
        </button>
        <button
          className={`btn btn-outline w-24 ${
            backendOffline ? "btn-disabled" : "btn-error"
          }`}
          onClick={onDelete}
          disabled={backendOffline}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DetailView;
