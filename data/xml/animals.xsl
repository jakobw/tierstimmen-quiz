<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" encoding="UTF-8" indent="yes"/>

	<xsl:template match="/">
		<Animals>
			<xsl:for-each select="//Animal">
				<Animal>
					<Id>
						<xsl:value-of select="position()"/>
					</Id>
					<ScientificName>
						<xsl:value-of select="substring-before(.,';')"/>
					</ScientificName>
					<ScientificType>
						<xsl:value-of select="substring-before(substring-after(.,';'),';')"/>
					</ScientificType>
					<GermanName>
						<xsl:value-of select="substring-before(substring-after(substring-after(.,';'),';'),';')"/>
					</GermanName>
					<GermanType>
						<xsl:value-of select="substring-after(substring-after(substring-after(.,';'),';'),';')"/>
					</GermanType>
					<SoundFile>
						<xsl:value-of select="concat('anyurl.com/sounds/',substring-before(.,';'),'.mp3')"/><!--hier natürlich den dann eigentlichen Pfad generieren-->
					</SoundFile>
					<PictureFile></PictureFile>
					<WikipediaText></WikipediaText>
				</Animal>
			</xsl:for-each>
		</Animals>
	</xsl:template>

</xsl:stylesheet>
