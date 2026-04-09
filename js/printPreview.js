// Abre una ventana de vista previa con la hoja carta, el sello arrastrable/redimensionable
// y el botón de impresión. stampInnerHTML es el HTML interno del sello ya construido.
function openPrintPreview(stampInnerHTML) {
    const printWindow = window.open('', '_blank');
    if (!printWindow || printWindow.closed) {
        alert('El navegador bloqueó la ventana emergente. Por favor, permita las ventanas emergentes para este sitio e intente de nuevo.');
        return;
    }
    printWindow.document.write(`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Vista Previa - Sello Notarial</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: Arial, sans-serif;
            background: #555;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .controls {
            background: #1e1e1e;
            padding: 8px 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
        }
        .controls .lbl { font-size: 11px; color: #aaa; }
        .controls button {
            padding: 4px 10px;
            border: 1px solid #555;
            background: #333;
            color: #eee;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        }
        .controls button:hover { background: #444; }
        #zoom-label { color: #fff; font-size: 12px; min-width: 36px; text-align: center; }
        .hint { color: #777; font-size: 11px; }
        .btn-print {
            margin-left: auto;
            background: #2a7a2a !important;
            border-color: #1a5a1a !important;
            color: white !important;
            font-weight: bold;
            padding: 5px 18px !important;
        }
        .btn-print:hover { background: #368a36 !important; }
        .preview-area {
            flex: 1;
            overflow: auto;
            display: flex;
            justify-content: center;
            padding: 30px 20px;
        }
        .page {
            width: 816px;
            height: 1056px;
            background: white;
            position: relative;
            box-shadow: 0 6px 28px rgba(0,0,0,0.6);
            flex-shrink: 0;
            transform-origin: top center;
        }
        .stamp {
            position: absolute;
            left: 163px;
            top: 50px;
            width: 490px;
            border: 1px solid #000;
            background: white;
            cursor: move;
            user-select: none;
            font-size: 12px;
        }
        .stamp.sel { outline: 2px dashed #4a90d9; outline-offset: 3px; }
        .stamp-header {
            text-align: center;
            padding: 15px;
            border-bottom: 1px solid #000;
        }
        .stamp-body {
            text-align: center;
            padding: 15px;
        }
        .handle {
            position: absolute;
            width: 10px; height: 10px;
            background: white;
            border: 2px solid #4a90d9;
            border-radius: 2px;
            z-index: 10;
        }
        .h-nw { top:-5px;  left:-5px;             cursor:nw-resize; }
        .h-n  { top:-5px;  left:calc(50% - 5px);  cursor:n-resize;  }
        .h-ne { top:-5px;  right:-5px;            cursor:ne-resize; }
        .h-e  { top:calc(50% - 5px); right:-5px;  cursor:e-resize;  }
        .h-se { bottom:-5px; right:-5px;          cursor:se-resize; }
        .h-s  { bottom:-5px; left:calc(50% - 5px);cursor:s-resize;  }
        .h-sw { bottom:-5px; left:-5px;           cursor:sw-resize; }
        .h-w  { top:calc(50% - 5px); left:-5px;   cursor:w-resize;  }
        @media print {
            @page { size: letter; margin: 0; }
            body { background: none; display: block; height: auto; overflow: visible; }
            .controls { display: none !important; }
            .preview-area { padding: 0; display: block; overflow: visible; }
            .page { transform: none !important; width: 8.5in; height: 11in; box-shadow: none; }
            .stamp { cursor: default; outline: none !important; }
            .handle { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="controls">
        <span class="lbl">Zoom:</span>
        <button onclick="changeZoom(-0.1)">&#8722;</button>
        <span id="zoom-label">100%</span>
        <button onclick="changeZoom(0.1)">+</button>
        <button onclick="fitToWindow()">Ajustar</button>
        <span class="hint">&nbsp;| Arrastre el sello para moverlo &middot; Tire de los puntos azules para redimensionar</span>
        <button class="btn-print" onclick="window.print()">Imprimir</button>
    </div>
    <div class="preview-area" id="preview-area">
        <div class="page" id="page">
            <div class="stamp sel" id="stamp">
                <div class="handle h-nw" data-dir="nw"></div>
                <div class="handle h-n"  data-dir="n"></div>
                <div class="handle h-ne" data-dir="ne"></div>
                <div class="handle h-e"  data-dir="e"></div>
                <div class="handle h-se" data-dir="se"></div>
                <div class="handle h-s"  data-dir="s"></div>
                <div class="handle h-sw" data-dir="sw"></div>
                <div class="handle h-w"  data-dir="w"></div>
                ${stampInnerHTML}
            </div>
        </div>
    </div>
    <script>
        var PAGE_W = 816, PAGE_H = 1056;
        var BASE_W = 490, BASE_H = 0, BASE_FONT = 12;
        var page  = document.getElementById('page');
        var stamp = document.getElementById('stamp');
        var scale = 1;

        function applyZoom(s) {
            scale = Math.max(0.25, Math.min(2, s));
            page.style.transform = 'scale(' + scale + ')';
            document.getElementById('zoom-label').textContent = Math.round(scale * 100) + '%';
        }
        function changeZoom(d) { applyZoom(scale + d); }
        function fitToWindow() {
            var area = document.getElementById('preview-area');
            var s = Math.min((area.clientWidth - 60) / PAGE_W, (area.clientHeight - 60) / PAGE_H);
            applyZoom(s);
        }
        window.addEventListener('load', function() {
            var cs = window.getComputedStyle(stamp);
            stamp.style.left = cs.left;
            stamp.style.top  = cs.top;
            BASE_H = stamp.offsetHeight;
            stamp.style.height = BASE_H + 'px';
            stamp.style.overflow = 'hidden';
            fitToWindow();
        });
        window.addEventListener('resize', fitToWindow);

        function pageCoords(e) {
            var r = page.getBoundingClientRect();
            return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
        }
        function stampLeft() { return parseFloat(stamp.style.left) || 0; }
        function stampTop()  { return parseFloat(stamp.style.top)  || 0; }

        var action = null, dir = '', start = {};

        stamp.addEventListener('mousedown', function(e) {
            if (e.target.dataset.dir) return;
            action = 'drag';
            var p = pageCoords(e);
            start = { mx:p.x, my:p.y, sx:stampLeft(), sy:stampTop(), sw:stamp.offsetWidth, sh:stamp.offsetHeight };
            e.preventDefault();
        });

        document.querySelectorAll('.handle').forEach(function(h) {
            h.addEventListener('mousedown', function(e) {
                action = 'resize'; dir = e.target.dataset.dir;
                var p = pageCoords(e);
                start = { mx:p.x, my:p.y, sx:stampLeft(), sy:stampTop(), sw:stamp.offsetWidth, sh:stamp.offsetHeight };
                e.preventDefault(); e.stopPropagation();
            });
        });

        document.addEventListener('mousemove', function(e) {
            if (!action) return;
            var p = pageCoords(e);
            var dx = p.x - start.mx, dy = p.y - start.my;

            if (action === 'drag') {
                stamp.style.left = Math.max(0, Math.min(PAGE_W - start.sw, start.sx + dx)) + 'px';
                stamp.style.top  = Math.max(0, Math.min(PAGE_H - start.sh, start.sy + dy)) + 'px';
                return;
            }

            var x=start.sx, y=start.sy, w=start.sw, h=start.sh;
            if (dir.includes('e')) w = Math.max(80, w + dx);
            if (dir.includes('w')) { var nw=Math.max(80,start.sw-dx); x=start.sx+start.sw-nw; w=nw; }
            if (dir.includes('s')) h = Math.max(40, h + dy);
            if (dir.includes('n')) { var nh=Math.max(40,start.sh-dy); y=start.sy+start.sh-nh; h=nh; }
            if (x<0){w+=x;x=0;} if(y<0){h+=y;y=0;}
            w=Math.min(w,PAGE_W-x); h=Math.min(h,PAGE_H-y);
            stamp.style.left     = x + 'px';
            stamp.style.top      = y + 'px';
            stamp.style.width    = w + 'px';
            stamp.style.height   = h + 'px';
            stamp.style.overflow = 'hidden';
            var scaleF = Math.min(w / BASE_W, h / BASE_H);
            stamp.style.fontSize = (BASE_FONT * scaleF).toFixed(2) + 'px';
        });

        document.addEventListener('mouseup', function() { action = null; });

        // Soporte táctil
        function touchCoords(e) { return pageCoords(e.touches[0]); }

        stamp.addEventListener('touchstart', function(e) {
            if (e.target.dataset.dir) return;
            action = 'drag';
            var p = touchCoords(e);
            start = { mx:p.x, my:p.y, sx:stampLeft(), sy:stampTop(), sw:stamp.offsetWidth, sh:stamp.offsetHeight };
            e.preventDefault();
        }, { passive: false });

        document.querySelectorAll('.handle').forEach(function(h) {
            h.addEventListener('touchstart', function(e) {
                action = 'resize'; dir = e.target.dataset.dir;
                var p = touchCoords(e);
                start = { mx:p.x, my:p.y, sx:stampLeft(), sy:stampTop(), sw:stamp.offsetWidth, sh:stamp.offsetHeight };
                e.preventDefault(); e.stopPropagation();
            }, { passive: false });
        });

        document.addEventListener('touchmove', function(e) {
            if (!action) return;
            var p = touchCoords(e);
            var dx = p.x - start.mx, dy = p.y - start.my;

            if (action === 'drag') {
                stamp.style.left = Math.max(0, Math.min(PAGE_W - start.sw, start.sx + dx)) + 'px';
                stamp.style.top  = Math.max(0, Math.min(PAGE_H - start.sh, start.sy + dy)) + 'px';
                e.preventDefault(); return;
            }

            var x=start.sx, y=start.sy, w=start.sw, h=start.sh;
            if (dir.includes('e')) w = Math.max(80, w + dx);
            if (dir.includes('w')) { var nw=Math.max(80,start.sw-dx); x=start.sx+start.sw-nw; w=nw; }
            if (dir.includes('s')) h = Math.max(40, h + dy);
            if (dir.includes('n')) { var nh=Math.max(40,start.sh-dy); y=start.sy+start.sh-nh; h=nh; }
            if (x<0){w+=x;x=0;} if(y<0){h+=y;y=0;}
            w=Math.min(w,PAGE_W-x); h=Math.min(h,PAGE_H-y);
            stamp.style.left     = x + 'px';
            stamp.style.top      = y + 'px';
            stamp.style.width    = w + 'px';
            stamp.style.height   = h + 'px';
            stamp.style.overflow = 'hidden';
            var scaleF = Math.min(w / BASE_W, h / BASE_H);
            stamp.style.fontSize = (BASE_FONT * scaleF).toFixed(2) + 'px';
            e.preventDefault();
        }, { passive: false });

        document.addEventListener('touchend', function() { action = null; });
    <\/script>
</body>
</html>
    `);
    printWindow.document.close();
}
