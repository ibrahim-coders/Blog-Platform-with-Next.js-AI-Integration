import { Plus } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'sonner';
import { useGetMeQuery } from '../services/userApi';
import { useCreatePostMutation } from '../services/postsApi';
const FromModal = ({
  closeModal,
  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,
  loading,
  setLoading,
}) => {
  const { data: user, refetch } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const userInf = user?.user;
  const [createPost] = useCreatePostMutation();

  // GenerateContent

  const handleGenerateContent = async () => {
    setLoading(true);
    const res = await fetch('/api/ai/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    console.log(data);
    setTitle(data.title || '');
    setContent(data.content || '');
    setTags(data.tags || '');

    setLoading(false);
  };

  // PublishBlog content database

  const handlePublishBlog = async () => {
    if (!userInf) return (window.location.href = '/login');
    if (loading) return;
    setLoading(true);

    try {
      const res = await createPost({
        title,
        content,
        tags,
        userName: userInf?.name,
        userEmail: userInf?.email,
      }).unwrap();

      closeModal();
      toast.success(res.message);
      await refetch();
    } catch (error) {
      toast.error('Internal server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full  sm:max-w-md mx-auto ">
      <button
        type="button"
        onClick={closeModal}
        className="absolute top-0 right-0 size-4 text-red-600 cursor-pointer"
      >
        <Plus />
      </button>
      <div className="flex flex-col md:justify-between items-center">
        {' '}
        <h2 className="text-2xl font-bold text-emerald-500 mb-4">
          Write New Post
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleGenerateContent}
            disabled={loading || !content}
            className="flex gap-2 shdow rounded border border-emerald-500 px-3 py-2  cursor-pointer"
          >
            {loading ? 'Generating...' : <>Generate</>}
          </button>
          <button
            onClick={handlePublishBlog}
            disabled={loading}
            className="flex gap-2 shadow rounded border px-3 py-2 text-white transition-colors duration-200 
              bg-emerald-500 hover:bg-emerald-600
            "
          >
            Publish
          </button>
        </div>
      </div>

      {/* loading */}
      <div className="w-full md:max-w-md min-h-[300px] mx-auto">
        {loading ? (
          <div className="flex-1 w-[400px]  flex items-center justify-center text-center h-[300px]">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col space-y-2 items-start">
              <label className="inline-block text-sm text-slate-50">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-50 focus:outline-none bg-[#314158] text-slate-50 transition-colors duration-200"
                placeholder="title"
                required
              />
              <label className="inline-block text-sm text-slate-400">
                Content
              </label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                cols={50}
                rows={4}
                className="w-full p-2.5 text-sm border border-slate-50 focus:outline-none bg-[#314158] text-slate-50 transition-colors duration-200"
              ></textarea>
              <label className="inline-block text-sm text-slate-400">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="Enter tags "
                className="w-full p-2.5 text-sm border border-slate-50 focus:outline-none bg-[#314158] text-slate-50 transition-colors duration-200"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FromModal;
