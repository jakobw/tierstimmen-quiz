<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" encoding="UTF-8" indent="yes"/>

	<xsl:template match="/">
		<Animals xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="animals.xsd">
			<xsl:for-each select="//Animal[not(./PictureFile='')]">
				<Animal>
					<Id>
						<xsl:value-of select="position()"/>
					</Id>
					<ScientificName>
						<xsl:value-of select="./ScientificName"/>
					</ScientificName>
					<ScientificType>
						<xsl:value-of select="./ScientificType"/>
					</ScientificType>
					<GermanName>
						<xsl:value-of select="./GermanName"/>
					</GermanName>
					<GermanType>
						<xsl:value-of select="./SoundFile"/>
					</GermanType>
					<SoundFile>
						<xsl:value-of select="./SoundFile"/>
					</SoundFile>
					<PictureFile>
						<xsl:value-of select="./PictureFile"/>
					</PictureFile>
					<WikipediaText>
						<xsl:value-of select="./WikipediaText"/>
					</WikipediaText>
				</Animal>
			</xsl:for-each>
		</Animals>
	</xsl:template>

</xsl:stylesheet>
