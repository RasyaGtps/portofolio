<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
						color: #333;
						max-width: 75%;
						margin: 0 auto;
						padding: 1em;
					}
					table {
						border-collapse: collapse;
						width: 100%;
						margin: 1em 0;
					}
					th, td {
						padding: 0.5em;
						text-align: left;
						border: 1px solid #ddd;
					}
					th {
						background-color: #f5f5f5;
					}
					h1 {
						color: #1a73e8;
					}
					a {
						color: #1a73e8;
						text-decoration: none;
					}
					a:hover {
						text-decoration: underline;
					}
				</style>
			</head>
			<body>
				<h1>XML Sitemap</h1>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="sitemap:urlset">
		<table>
			<tr>
				<th>URL</th>
				<th>Last Modified</th>
				<th>Change Frequency</th>
				<th>Priority</th>
			</tr>
			<xsl:for-each select="sitemap:url">
				<tr>
					<td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
					<td><xsl:value-of select="sitemap:lastmod"/></td>
					<td><xsl:value-of select="sitemap:changefreq"/></td>
					<td><xsl:value-of select="sitemap:priority"/></td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
	
	<xsl:template match="sitemap:sitemapindex">
		<table>
			<tr>
				<th>Sitemap URL</th>
			</tr>
			<xsl:for-each select="sitemap:sitemap">
				<tr>
					<td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
				</tr>
			</xsl:for-each>
		</table>
	</xsl:template>
</xsl:stylesheet> 