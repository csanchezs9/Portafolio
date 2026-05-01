"use client";

import { ExternalLink, Github, FileText, Lock } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    github?: string;
    demo?: string;
    pdf?: string;
    preview?: string;
    forFun?: boolean;
    privateRepo?: boolean;
}

export default function ProjectCard({
    title,
    description,
    tags,
    github,
    demo,
    pdf,
    preview,
    forFun = false,
    privateRepo = false,
}: ProjectCardProps) {
    return (
        <article
            className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${forFun
                    ? "border-2 border-dashed border-primary/40 hover:border-primary bg-gradient-to-br from-primary/5 to-accent/10"
                    : "border border-border/10 hover:border-border/30 bg-card/30 backdrop-blur-sm"
                } hover:shadow-2xl hover:shadow-primary/10`}
        >
            {/* Preview Image */}
            {preview && (
                <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20"
                >
                    <img
                        src={preview}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                            Click to Play →
                        </span>
                    </div>
                </a>
            )}

            {/* Card Content */}
            <div className="p-6 space-y-4">
                {/* Header with Title and Badge */}
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-heading font-bold text-primary leading-tight group-hover:text-primary/80 transition-colors">
                        {title}
                    </h3>
                    {forFun && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-md whitespace-nowrap flex-shrink-0">
                            FOR FUN!
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    {github && !privateRepo && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View code"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/5 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                            <Github className="w-4 h-4" />
                            Code
                        </a>
                    )}
                    {privateRepo && (
                        <span
                            aria-label="Private repository"
                            tabIndex={0}
                            className="group/code inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg cursor-not-allowed select-none transition-all duration-200 text-foreground border-border/50 hover:border-red-500/70 hover:bg-red-500/10 hover:text-red-500"
                        >
                            <Github className="w-4 h-4 group-hover/code:hidden" />
                            <Lock className="w-4 h-4 hidden group-hover/code:inline" />
                            <span className="group-hover/code:hidden">Code</span>
                            <span className="hidden group-hover/code:inline font-semibold uppercase tracking-wider text-xs">
                                Private
                            </span>
                        </span>
                    )}
                    {demo && (
                        <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/20"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                        </a>
                    )}
                    {pdf && (
                        <a
                            href={pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border/50 hover:border-accent/50 hover:bg-accent/5 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                            <FileText className="w-4 h-4" />
                            View
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
