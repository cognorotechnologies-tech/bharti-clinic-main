import { useState, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';

interface ImageUploaderProps {
    images: string[];
    onChange: (images: string[]) => void;
    maxImages?: number;
    label?: string;
}

export function ImageUploader({ images, onChange, maxImages = 5, label = 'Product Images' }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        async (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            setError('');

            const files = Array.from(e.dataTransfer.files);
            await handleFiles(files);
        },
        [images, maxImages]
    );

    const handleFileInput = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            setError('');
            const files = Array.from(e.target.files || []);
            await handleFiles(files);
        },
        [images, maxImages]
    );

    const handleFiles = async (files: File[]) => {
        // Validate file count
        if (images.length + files.length > maxImages) {
            setError(`Maximum ${maxImages} images allowed`);
            return;
        }

        // Validate file types
        const validFiles = files.filter((file) => {
            if (!file.type.startsWith('image/')) {
                setError('Only image files are allowed');
                return false;
            }
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                setError('Image size must be less than 5MB');
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        setUploading(true);

        try {
            // Convert files to base64 for preview (in production, upload to server)
            const newImages = await Promise.all(
                validFiles.map((file) => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                })
            );

            onChange([...images, ...newImages]);
        } catch (err) {
            setError('Failed to upload images');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    const handleReorder = (newOrder: string[]) => {
        onChange(newOrder);
    };

    return (
        <div className="space-y-4">
            {/* Label */}
            <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                    {label}
                    <span className="text-gray-400 font-normal ml-2">
                        ({images.length}/{maxImages})
                    </span>
                </label>
                {images.length > 0 && (
                    <span className="text-xs text-gray-500">Drag to reorder</span>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm"
                >
                    {error}
                </motion.div>
            )}

            {/* Image Grid */}
            {images.length > 0 && (
                <Reorder.Group
                    axis="x"
                    values={images}
                    onReorder={handleReorder}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
                >
                    <AnimatePresence>
                        {images.map((image, index) => (
                            <Reorder.Item
                                key={image}
                                value={image}
                                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-move"
                            >
                                <img
                                    src={image}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Primary Badge */}
                                {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-lotus-pink text-white text-xs font-bold px-2 py-1 rounded">
                                        Primary
                                    </div>
                                )}

                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <X size={14} />
                                </button>

                                {/* Drag Indicator */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex gap-1">
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </Reorder.Item>
                        ))}
                    </AnimatePresence>
                </Reorder.Group>
            )}

            {/* Upload Area */}
            {images.length < maxImages && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                        isDragging
                            ? 'border-lotus-pink bg-lotus-pink/5 scale-[1.02]'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />

                    <div className="flex flex-col items-center justify-center text-center">
                        {uploading ? (
                            <>
                                <Loader className="w-12 h-12 text-lotus-pink animate-spin mb-4" />
                                <p className="text-sm font-semibold text-gray-700">Uploading images...</p>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    {isDragging ? (
                                        <Upload className="w-8 h-8 text-lotus-pink" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-gray-400" />
                                    )}
                                </div>

                                <p className="text-sm font-semibold text-gray-700 mb-1">
                                    {isDragging ? 'Drop images here' : 'Drag & drop images here'}
                                </p>
                                <p className="text-xs text-gray-500 mb-4">or click to browse</p>

                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span>• Max {maxImages} images</span>
                                    <span>• Up to 5MB each</span>
                                    <span>• JPG, PNG, WebP</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Helper Text */}
            <p className="text-xs text-gray-500">
                💡 Tip: The first image will be used as the primary product image. Drag images to reorder them.
            </p>
        </div>
    );
}
