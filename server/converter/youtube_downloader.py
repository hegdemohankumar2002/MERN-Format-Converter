#!/usr/bin/env python3
"""
YouTube Video Downloader using yt-dlp Python package
"""

import os
import sys
import yt_dlp
import io

def download_youtube_video(url, output_dir):
    """
    Download YouTube video using yt-dlp Python package

    Args:
        url (str): YouTube video URL
        output_dir (str): Directory to save the downloaded video

    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Set stdout and stderr to handle unicode characters properly
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

        print("YouTube Downloader")
        print("URL: {}".format(url))
        print("Output directory: {}".format(output_dir))

        # Ensure output directory exists
        if not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)
            print("Created output directory: {}".format(output_dir))

        # Configure yt-dlp options to download audio in MP3 format
        ydl_opts = {
            'outtmpl': os.path.join(output_dir, '%(title)s.%(ext)s'),
            'format': 'bestaudio/best',
            'extractaudio': True,
            'audio_format': 'mp3',
            'audio_quality': '192K',
            'quiet': False,
            'no_warnings': False,
            'progress_hooks': [lambda d: print("Download progress: {}".format(d.get('_percent_str', 'N/A'))) if d['status'] == 'downloading' else None]
        }
        
        print("yt-dlp options configured")
        
        # Download the video
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print("Starting download...")
            info = ydl.extract_info(url, download=True)
            print("Download completed successfully!")
            print("Video title: {}".format(info.get('title', 'Unknown')))
            print("Duration: {} seconds".format(info.get('duration', 'Unknown')))
        
        # Check if files were downloaded
        files = os.listdir(output_dir)
        if not files:
            print("No files were downloaded")
            return False
        
        print("Downloaded {} file(s): {}".format(len(files), files))
        return True
        
    except Exception as e:
        print("Error during YouTube download: {}".format(e))
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python youtube_downloader.py <youtube_url> <output_dir>")
        sys.exit(1)
    
    url = sys.argv[1]
    output_dir = sys.argv[2]
    
    print("YouTube Downloader")
    print("URL: {}".format(url))
    print("Output: {}".format(output_dir))
    print("-" * 50)
    
    success = download_youtube_video(url, output_dir)
    
    if success:
        print("YouTube download completed successfully")
        sys.exit(0)
    else:
        print("YouTube download failed")
        sys.exit(1)
