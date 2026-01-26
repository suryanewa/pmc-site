import os
from PIL import Image

scale_factor = 2.5
cursor_dir = "public/cursors/"

hotspots = {
    "default.cur": (0, 0),
    "pointer.cur": (5, 0),  
    "text.cur": (4, 10),    
    "move.cur": (10, 10),   
    "not-allowed.cur": (10, 10), 
    "ew-resize.cur": (10, 10), 
    "ns-resize.cur": (10, 10), 
    "nesw-resize.cur": (10, 10), 
    "nwse-resize.cur": (10, 10), 
    "wait.ani": (0, 0)
}

files = [f for f in os.listdir(cursor_dir) if f.endswith(".cur")]

for filename in files:
    try:
        path = os.path.join(cursor_dir, filename)
        with Image.open(path) as img:
            w, h = img.size
            new_w = int(w * scale_factor)
            new_h = int(h * scale_factor)
            
            resized_img = img.resize((new_w, new_h), Image.Resampling.NEAREST)
            
            new_filename = filename.replace(".cur", "-large.png")
            new_path = os.path.join(cursor_dir, new_filename)
            resized_img.save(new_path)
            
            orig_hotspot = hotspots.get(filename, (0, 0))
            new_hotspot = (int(orig_hotspot[0] * scale_factor), int(orig_hotspot[1] * scale_factor))
            
            print(f"Processed {filename} -> {new_filename} (Hotspot: {new_hotspot})")
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")

try:
    path = os.path.join(cursor_dir, "wait.ani")
    if os.path.exists(path):
        with Image.open(path) as img:
            w, h = img.size
            new_w = int(w * scale_factor)
            new_h = int(h * scale_factor)
            
            # Using Resampling.NEAREST for latest Pillow, or NEAREST for older
            # Since script failed before, try to use getattr to be safe or just standard
            resample_method = getattr(Image, 'Resampling', Image).NEAREST
            
            resized_img = img.resize((new_w, new_h), resample_method)
            new_filename = "wait-large.png"
            new_path = os.path.join(cursor_dir, new_filename)
            resized_img.save(new_path)
            print(f"Processed wait.ani (first frame) -> {new_filename}")
except Exception as e:
    print(f"Error processing wait.ani: {e}")
