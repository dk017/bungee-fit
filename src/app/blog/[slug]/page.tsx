import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '../../../data/blog-posts';

// Use generateStaticParams for static export compatibility if needed, 
// or just standard dynamic routing.
export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-neutral-500 hover:text-indigo-600 mb-8 transition-colors"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Blog
                </Link>

                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="text-neutral-500">
                        Published on {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </header>

                <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-lg">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div
                    className="prose prose-lg prose-indigo mx-auto mb-16 text-neutral-700 prose-headings:font-bold prose-headings:text-neutral-900 prose-p:leading-relaxed prose-li:marker:text-indigo-500 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Product Recommendations Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 md:p-12 my-12">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center">
                        <span className="bg-indigo-600 w-2 h-8 mr-4 rounded-full"></span>
                        Recommended Gear
                    </h3>

                    <div className="grid gap-8">
                        {post.products.map((product, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-6 items-start border-b border-neutral-100 pb-8 last:border-0 last:pb-0">
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-neutral-900 mb-2">{product.name}</h4>
                                    <p className="text-neutral-600 mb-4">{product.description}</p>

                                    <a
                                        href={product.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg transform active:scale-95 duration-150"
                                    >
                                        Check Price on Amazon
                                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 text-xs text-neutral-400 text-center">
                        As an Amazon Associate we earn from qualifying purchases. This helps support our site at no extra cost to you.
                    </div>
                </div>
            </article>
        </div>
    );
}
