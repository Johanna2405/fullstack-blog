import { useState, useRef } from "react";

const DetailView = ({
  post,
  onDelete,
  backendOffline,
  error,
  handleUpdatePost,
  entries,
  setSelectedEntry,
}) => {
  const modalRef = useRef(null); // Modal reference
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedAuthor, setEditedAuthor] = useState(post.author || ""); // Editable author field
  const [editedCover, setEditedCover] = useState(post.cover || ""); // Editable cover URL field

  // Open Modal
  const handleOpenEditModal = () => {
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setEditedAuthor(post.author || "");
    setEditedCover(post.cover || "");
    modalRef.current.showModal(); // Open the modal
  };

  // Save Changes
  const handleSaveChanges = () => {
    handleUpdatePost({
      ...post,
      title: editedTitle,
      content: editedContent,
      author: editedAuthor,
      cover: editedCover,
    });
    modalRef.current.close(); // Close the modal
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center container w-1/2 shadow-lg mx-auto my-10 bg-lightGreen p-6 rounded-lg gap-4">
        {/* ⚠️ Warning if backend is offline */}
        {error && (
          <p className="text-red-500 text-center text-xl font-bold">{error}</p>
        )}

        {/* Cover Image */}
        {post.cover ? (
          <div className="w-full h-96 overflow-hidden rounded-lg">
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
        <div className="flex flex-col bg-darkGreen p-4 items-start rounded-lg">
          <h1 className="text-3xl text-lightBeige pb-2 uppercase tracking-widest font-Snippet">
            {post.title}
          </h1>
          {post.author ? (
            <p className="text-lg text-lightBeige uppercase tracking-widest font-Snippet">
              {post.author}
            </p>
          ) : (
            <p>No author information available</p>
          )}

          <div className="divider"></div>

          <div className="flex flex-row justify-between w-full">
            {/* CreatedAt */}
            <p className="font-thin text-lightBeige text-lg">
              {post.createdAt
                ? `Created: ${new Date(post.createdAt).toLocaleDateString()}`
                : "No creation date available"}
            </p>

            {/* UpdatedAt (only rendered if available) */}
            {post.updatedAt && (
              <p className="font-thin text-lightBeige text-lg">
                Last updated: {new Date(post.updatedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-darkGreen p-4 rounded-lg">
          <p className="text-lightBeige text-lg font-thin min-h-36 font-Snippet">
            {post.content}
          </p>
        </div>

        {/* Pagination & Action Buttons */}
        <div className="flex justify-between items-center my-4">
          {entries.length > 0 && (
            <div className="join grid grid-cols-2">
              <button
                className="join-item px-4 py-2 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg  text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
                disabled={entries[0].id === post.id}
                onClick={() =>
                  setSelectedEntry(
                    entries[entries.findIndex((p) => p.id === post.id) - 1]
                  )
                }
              >
                Previous Post
              </button>
              <button
                className="join-item px-4 py-2 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg  text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
                disabled={entries[entries.length - 1].id === post.id}
                onClick={() =>
                  setSelectedEntry(
                    entries[entries.findIndex((p) => p.id === post.id) + 1]
                  )
                }
              >
                Next Post
              </button>
            </div>
          )}

          {/* Edit & Delete Buttons */}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
              onClick={handleOpenEditModal}
              disabled={backendOffline}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
              onClick={onDelete}
              disabled={backendOffline}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Edit Modal */}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box bg-lightGreen">
            <h3 className="font-bold text-lg text-lightBeige">Edit Post</h3>

            {/* Title Input */}
            <div className="form-control mt-4">
              <label className="label text-lightBeige">Title</label>
              <input
                type="text"
                className="input input-bordered"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>

            {/* Author Input */}
            <div className="form-control mt-4">
              <label className="label text-lightBeige">Author</label>
              <input
                type="text"
                className="input input-bordered"
                value={editedAuthor}
                onChange={(e) => setEditedAuthor(e.target.value)}
              />
            </div>

            {/* Cover URL Input */}
            <div className="form-control mt-4">
              <label className="label text-lightBeige">Cover Image URL</label>
              <input
                type="text"
                className="input input-bordered"
                value={editedCover}
                onChange={(e) => setEditedCover(e.target.value)}
              />
            </div>

            {/* Content Input */}
            <div className="form-control mt-4">
              <label className="label text-lightBeige">Content</label>
              <textarea
                className="textarea textarea-bordered h-32"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                className="px-2 py-1 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className="px-2 py-1 rounded-2xl border border-lightBeige hover:border-orange hover:text-orange text-lg text-lightBeige font-extralight uppercase tracking-widest transition-all duration-300 ease-in-out transform"
                onClick={() => modalRef.current.close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DetailView;
