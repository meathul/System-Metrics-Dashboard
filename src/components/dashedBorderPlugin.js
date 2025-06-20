const dashedBorderPlugin = {
    id: 'dashedBorder',
    afterDraw(chart, args, options) {
      const meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data[0]) return;
  
      const arc = meta.data[0];
      const { x, y } = arc.getCenterPoint();
      const outerRadius = arc.outerRadius;
      const ctx = chart.ctx;
      const rotation = chart.options.rotation || -Math.PI / 2;
      const circumference = chart.options.circumference || 2 * Math.PI;
  
      const numTicks = options.ticks || 100;
  
      ctx.save();
      ctx.strokeStyle = options.color || 'rgba(255,255,255,0.3)';
      ctx.lineWidth = options.lineWidth || 1;
  
      for (let i = 0; i < numTicks; i++) {
        const angle = rotation + (i / numTicks) * circumference;
        const startX = x + Math.cos(angle) * (outerRadius + 2);
        const startY = y + Math.sin(angle) * (outerRadius + 2);
        const endX = x + Math.cos(angle) * (outerRadius + 6);
        const endY = y + Math.sin(angle) * (outerRadius + 6);
  
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
  
      ctx.restore();
    }
  };
  
  export default dashedBorderPlugin;
  