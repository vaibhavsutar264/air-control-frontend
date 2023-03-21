import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetPm1ParticlesQuery,useGetPm2_5ParticlesQuery,useGetPm10ParticlesQuery } from "state/api";
import SliderProton from "components/SliderProton";

const Pm10Particles = () => {
  const [selectedHours, setSelectedHours] = useState([0, 24]);
  const handleChangeHours = (event, value) => {
    setSelectedHours(value);
  };
  const { data } = useGetPm10ParticlesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { particles } = data;
    const delhiReadings = {
      id: "Delhi",
      color: theme.palette.secondary.main,
      data: [],
    };
    const mumbaiReadings = {
      id: "Mumbai",
      color: theme.palette.secondary[600],
      data: [],
    };
    const keralaReadings = {
      id: "Kerala",
      color: theme.palette.secondary[900],
      data: [],
    };

    Object.values(particles).forEach(({ timeInHours, delhi, mumbai,kerala }) => {
      if(Number(timeInHours) >=selectedHours[0] && Number(timeInHours)<=selectedHours[1]){
      delhiReadings.data = [
        ...delhiReadings.data,
        { x: timeInHours, y: delhi },
      ];
      mumbaiReadings.data = [
        ...mumbaiReadings.data,
        { x: timeInHours, y: mumbai },
      ];
      keralaReadings.data = [
        ...keralaReadings.data,
        { x: timeInHours, y: kerala },
      ];
    }
    });

    const formattedData = [delhiReadings, mumbaiReadings, keralaReadings];
    return [formattedData];
  }, [data, selectedHours]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PM 10 Particles in Air Readings Compared With Delhi, Mumbai and Kerala Location" subtitle="Chart of PM10 Particle vs Locations" />
      <Box height="5vh">
      <SliderProton value={selectedHours} changePrice={handleChangeHours} />
      </Box>
      <Box height="70vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Hours",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "PM particles (µg/m³)",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 380,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Pm10Particles;
