/**
 * drawPath(ctx, pathState, isLight?)
 * Dashed line showing a path.
 */
export function drawPath(ctx, state, isLight = false) {
  ctx.beginPath();
  ctx.moveTo(state.points[0].x, state.points[0].y);
  for (let i = 1; i < state.points.length; i++) {
    ctx.lineTo(state.points[i].x, state.points[i].y);
  }
  ctx.strokeStyle = isLight ? '#ccc' : '#333';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);
}
