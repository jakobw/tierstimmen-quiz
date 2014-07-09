<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="4.01" encoding="UTF-8"/>

<xsl:template match="Animals">
<html>
<head>
	<title>Tierverzeichnis</title>
</head>
<body>
	<table>
		<tr>
			<th>Name</th>
			<th>Bild</th>
			<th>Stimme</th>
			<th>Wissenschaftlicher Name</th>
			<th>Link zur Wikipedia</th>
		</tr>
		<xsl:for-each select="Animal">
			<tr>
				<td>
					<xsl:attribute name="property">name</xsl:attribute>  <xsl:value-of select="GermanName"/>
				</td>
				<td>
					<img>
						<xsl:attribute name="property">imagefile</xsl:attribute>
						<xsl:attribute name="src"><xsl:value-of select="PictureFile"/></xsl:attribute>
					</img>
				</td>
				<td>
					<xsl:attribute name="property">soundfile</xsl:attribute>
					<a>
						<xsl:attribute name="href"><xsl:value-of select="SoundFile"/></xsl:attribute>
						<xsl:text>Stimme</xsl:text>
					</a>
				</td>
				<td>
					<xsl:value-of select="ScientificName"/>
				</td>
				<td>
					<a>
						<xsl:attribute name="href">http://de.wikipedia.org/wiki/<xsl:value-of select="ScientificName"/></xsl:attribute>
						<xsl:text>Wiki</xsl:text>
					</a>
				</td>
			</tr>
		</xsl:for-each>
	</table>
</body>

</html>  
</xsl:template>
</xsl:stylesheet>
