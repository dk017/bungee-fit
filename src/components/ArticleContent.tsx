import { Article } from "../lib/supabase";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article className="prose prose-lg max-w-none">
      <div className="mb-8">
        {article.featured_image && (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Author Section */}
      {article.author_name && (
        <div className="mt-12 flex items-center border-t pt-8">
          {article.author_image && (
            <img
              src={article.author_image}
              alt={article.author_name}
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <div>
            <h3 className="font-semibold text-lg">{article.author_name}</h3>
            {article.author_bio && (
              <p className="text-gray-600">{article.author_bio}</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
