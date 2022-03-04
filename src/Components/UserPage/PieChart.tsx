export function PieChart(props: { n: number; d: number; color: string }) {
  // http://yamatyuu.net/computer/html/svg/arc2.html
  const r = 50;
  const theta = (2 * Math.PI * props.n) / props.d;
  const center = { x: r, y: r };
  const arcStart = { x: r, y: 0 };
  const arcEnd = { x: r + r * Math.sin(theta), y: r - r * Math.cos(theta) };
  const overHalf = props.n * 2 > props.d;
  return (
    <svg fillOpacity={0.2} width={r * 2} height={r * 2}>
      <path
        d={`M ${center.x},${center.y} 
              L ${arcStart.x},${arcStart.y}
              A ${r} ${r} -90 
                ${overHalf ? 1 : 0} 1
                ${arcEnd.x},${arcEnd.y}
              z`}
        fill={props.color}
      />
      <path
        d={`M ${center.x},${center.y} 
              L ${arcStart.x},${arcStart.y}
              A ${r} ${r} -90 
                ${overHalf ? 0 : 1} 0
                ${arcEnd.x},${arcEnd.y}
              z`}
      />
    </svg>
  );
}
