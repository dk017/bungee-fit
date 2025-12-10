import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../data/blog-posts';

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <main className="container mx-auto px-4 py-12 md:py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
                        Bungee Fitness Insights
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Tips, gear reviews, and guides to help you fly higher and safer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="text-sm text-indigo-600 font-semibold mb-2">
                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-neutral-600 leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <span className="inline-flex items-center text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                                    Read Article
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
