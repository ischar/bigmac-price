import React, { useEffect, useRef } from "react";
import { Topology } from "topojson-specification";
import iso3166 from "iso-3166-1";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import mapData from "../assets/data/world-110m.json";
import bigMacData from "../assets/data/big-mac-index.csv";

interface MapProps {
  width: number;
  height: number;
}

interface BigMacProps {
  iso_a3: string;
  name: string;
  USD_raw: number;
}

const WorldMap: React.FC<MapProps> = ({ width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const projection = d3
      .geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);
    const topology = mapData as unknown as Topology;
    const geoData = topojson.feature(topology, topology.objects.countries);

    const colorScale = d3
      .scaleSequential(d3.interpolateRdYlGn)
      .domain([-0.2, 0.2])
      .range(["#00b894", "#d63031"]);

    d3.csv<BigMacProps>(bigMacData, (d) => ({
      iso_a3: d.iso_a3,
      name: d.name,
      USD_raw: +d.USD_raw,
    })).then((data) => {
      if (geoData.type === "FeatureCollection") {
        svg
          .selectAll("path")
          .data(geoData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", (d) => {
            const countryInfo = iso3166.whereNumeric(d.id as number);
            const alpha3 = countryInfo ? countryInfo.alpha3 : null;
            const country = alpha3
              ? data.find((item) => item.iso_a3 === alpha3)
              : undefined;
            console.log(country, country?.USD_raw);

            return country ? colorScale(country.USD_raw) : "#ccc";
          })
          .attr("stroke", "#FFFFFF")
          .attr("stroke-width", 1);
      } else {
        console.log("error");
      }
    });
  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default WorldMap;
