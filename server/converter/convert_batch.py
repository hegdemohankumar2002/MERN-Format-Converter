#!/usr/bin/env python3
"""
Batch Image/Media Converter
Converts various image and media formats
"""

import os
import sys
import imageio # type: ignore
from PIL import Image
import pillow_heif
import subprocess

# Register HEIF opener for HEIC support
pillow_heif.register_heif_opener()

RAW_EXTS = [".cr2", ".nef", ".arw", ".dng", ".orf", ".raw", ".rw2", ".raf", ".sr2"]

def convert_file(input_path, output_path, out_ext=None):
    ext = os.path.splitext(input_path)[1].lower()
    try:
        print(f"Converting {input_path} to {output_path}")
        
        if ext == ".heic" or ext == ".heif":
            try:
                # Try to open with PIL (which should handle HEIC via pillow_heif)
                img = Image.open(input_path)
                img.convert("RGB").save(output_path, "JPEG", quality=95)
                print(f"[SUCCESS] HEIC to JPG conversion successful")
            except Exception as e:
                print(f"[ERROR] PIL failed for HEIC: {e}")
                # Try direct pillow_heif approach
                try:
                    heif_file = pillow_heif.open_heif(input_path)
                    img = heif_file.to_pillow()
                    img.convert("RGB").save(output_path, "JPEG", quality=95)
                    print(f"[SUCCESS] HEIC to JPG conversion successful via pillow_heif")
                except Exception as e2:
                    print(f"[ERROR] pillow_heif failed: {e2}")
                    return False
        elif ext in RAW_EXTS:
            # For RAW files, try to use PIL first, then fallback to imageio
            try:
                img = Image.open(input_path)
                img.convert("RGB").save(output_path, "JPEG", quality=95)
                print(f"[SUCCESS] RAW to JPG conversion successful using PIL")
            except Exception as pil_error:
                print(f"[WARNING] PIL failed for RAW file, trying imageio: {pil_error}")
                try:
                    img = imageio.imread(input_path)
                    imageio.imsave(output_path, img)
                    print(f"[SUCCESS] RAW to JPG conversion successful using imageio")
                except Exception as imageio_error:
                    print(f"[ERROR] Both PIL and imageio failed for RAW file: {imageio_error}")
                    return False
        elif ext in [".jpg", ".jpeg"] and out_ext == ".png":
            img = Image.open(input_path)
            img.save(output_path, "PNG")
            print(f"[SUCCESS] JPG to PNG conversion successful")
        elif ext == ".png" and out_ext == ".jpg":
            img = Image.open(input_path)
            img = img.convert("RGB")
            img.save(output_path, "JPEG", quality=95)
            print(f"[SUCCESS] PNG to JPG conversion successful")
        elif ext == ".mp4" and out_ext == ".mp3":
            # Use ffmpeg to extract audio
            result = subprocess.run([
                "ffmpeg", "-y", "-i", input_path, "-vn", "-acodec", "libmp3lame", output_path
            ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode != 0:
                print(f"[ERROR] ffmpeg error: {result.stderr.decode()}")
                return False
            print(f"[SUCCESS] MP4 to MP3 conversion successful")
            return True
        else:
            print(f"[WARNING] Unsupported conversion: {ext} to {out_ext}")
            return False
        return True
    except Exception as e:
        print(f"[ERROR] Failed to convert {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def batch_convert(input_dir, output_dir):
    print(f"Starting batch conversion from {input_dir} to {output_dir}")
    
    try:
        if not os.path.exists(input_dir):
            print(f"[ERROR] Input directory {input_dir} does not exist")
            return False
            
        if not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
            print(f"[SUCCESS] Created output directory {output_dir}")
        
        # List all files in input directory
        all_files = os.listdir(input_dir)
        print(f"[INFO] Found {len(all_files)} files in input directory: {all_files}")
        
        files_to_convert = []
        for file in all_files:
            input_path = os.path.join(input_dir, file)
            if os.path.isfile(input_path):
                base, ext = os.path.splitext(file)
                ext = ext.lower()
                print(f"[INFO] Processing file: {file} (extension: {ext})")
                
                # Determine output extension
                if ext in [".jpg", ".jpeg"]:
                    output_path = os.path.join(output_dir, base + ".png")
                    out_ext = ".png"
                    files_to_convert.append((input_path, output_path, out_ext))
                    print(f"[SUCCESS] Will convert {file} to PNG")
                elif ext == ".png":
                    output_path = os.path.join(output_dir, base + ".jpg")
                    out_ext = ".jpg"
                    files_to_convert.append((input_path, output_path, out_ext))
                    print(f"[SUCCESS] Will convert {file} to JPG")
                elif ext == ".heic" or ext == ".heif":
                    output_path = os.path.join(output_dir, base + ".jpg")
                    out_ext = ".jpg"
                    files_to_convert.append((input_path, output_path, out_ext))
                    print(f"[SUCCESS] Will convert {file} to JPG")
                elif ext in RAW_EXTS:
                    output_path = os.path.join(output_dir, base + ".jpg")
                    out_ext = ".jpg"
                    files_to_convert.append((input_path, output_path, out_ext))
                    print(f"[SUCCESS] Will convert {file} to JPG")
                elif ext == ".mp4":
                    output_path = os.path.join(output_dir, base + ".mp3")
                    out_ext = ".mp3"
                    files_to_convert.append((input_path, output_path, out_ext))
                    print(f"[SUCCESS] Will convert {file} to MP3")
                else:
                    print(f"[WARNING] Skipping unsupported file: {file} (extension: {ext})")
            else:
                print(f"[WARNING] Skipping non-file item: {file}")
        
        if not files_to_convert:
            print("[ERROR] No files to convert found")
            return False
        
        print(f"[INFO] Found {len(files_to_convert)} files to convert")
        
        success_count = 0
        for input_path, output_path, out_ext in files_to_convert:
            print(f"[INFO] Converting: {os.path.basename(input_path)}")
            if convert_file(input_path, output_path, out_ext):
                success_count += 1
                print(f"[SUCCESS] Successfully converted: {os.path.basename(input_path)}")
            else:
                print(f"[ERROR] Failed to convert: {os.path.basename(input_path)}")
        
        print(f"[SUCCESS] Conversion complete: {success_count}/{len(files_to_convert)} files converted successfully")
        return success_count > 0
        
    except Exception as e:
        print(f"[ERROR] Error in batch_convert: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_batch.py <input_dir> <output_dir>")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2]
    
    print(f"Input directory: {input_dir}")
    print(f"Output directory: {output_dir}")
    
    success = batch_convert(input_dir, output_dir)
    
    if success:
        print("[SUCCESS] Batch conversion completed successfully")
        sys.exit(0)
    else:
        print("[ERROR] Batch conversion failed")
        sys.exit(1)
