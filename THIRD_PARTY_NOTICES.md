# Third-Party Data Notices

## D3 7.9.0

The browser bundle at `assets/vendor/d3-7.9.0.min.js` is [D3](https://github.com/d3/d3) version 7.9.0. It is used for the celestial projection, Canvas geometry, zooming, panning, and pointer interaction. A copy of the license is also stored at `assets/vendor/D3-LICENSE.txt`.

D3 7.9.0 is distributed under the [ISC License](https://github.com/d3/d3/blob/v7.9.0/LICENSE):

Copyright 2010-2023 Mike Bostock

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

The D3 bundle includes the [Delaunator](https://github.com/mapbox/delaunator) triangulation implementation, Copyright 2018 Vladimir Agafonkin, distributed under the same ISC terms above.

## Astronomy Engine 2.1.19

The browser bundle at `assets/vendor/astronomy-engine-2.1.19.min.js` is [Astronomy Engine](https://github.com/cosinekitty/astronomy) version [2.1.19](https://www.npmjs.com/package/astronomy-engine/v/2.1.19). It is used to convert J2000 equatorial coordinates, determine IAU constellation membership, calculate horizontal positions, rise/set events, twilight, lunar phases, planetary elongation, and angular approaches. The minified bundle retains the complete MIT notice; the text is reproduced below.

MIT License

Copyright (c) 2019-2023 Don Cross <cosinekitty@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## d3-celestial astronomical data

The constellation line geometry, constellation label positions, Hipparcos-based star positions and magnitudes, star name mappings, constellation boundaries, Messier objects, and selected bright deep-sky object records used to generate `data/constellations.js` and `data/sky-atlas.js` are derived from the data files distributed with [d3-celestial](https://github.com/ofrohn/d3-celestial).

Copyright (c) 2015, Olaf Frohn  
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

## Open-Meteo

Optional hourly weather forecasts are requested from the [Open-Meteo Forecast API](https://open-meteo.com/en/docs). Weather lookup is disabled by default. When a visitor explicitly enables it, the site sends coordinates rounded to two decimal places, elevation, timezone, and the selected forecast hour. Astronomy calculations do not depend on this request.

## Content notes

The Chinese editorial summaries, observation notes, and cross-cultural story descriptions in this project are original project content. Modern constellation names and boundaries follow the International Astronomical Union system. Traditional Chinese asterisms are described as a separate historical system and are not treated as one-to-one equivalents of modern constellation boundaries.
