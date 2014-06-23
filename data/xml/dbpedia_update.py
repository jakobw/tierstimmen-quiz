#!/usr/local/bin/python

from lxml import etree
from SPARQLWrapper import SPARQLWrapper, JSON
import sys

sparql = SPARQLWrapper("http://dbpedia.org/sparql")

xmldoc = etree.parse('animals.xml')

sys.stdout.write('Starting!') 

i = 0

for elem in xmldoc.xpath('//ScientificName'):
	i += 1
	if (i % 4 == 0):
		sys.stdout.write('.')
		sys.stdout.flush()

	statement =  """PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
			PREFIX dbpprop: <http://dbpedia.org/property/>
			PREFIX dbres: <http://dbpedia.org/resource/>

			select 	?abstract ?thumbnail ?y where {
				?x 	dbpprop:binomial "%s"@en .
				?x 	dbpedia-owl:abstract ?abstract ;
					dbpedia-owl:thumbnail ?thumbnail ;
					rdfs:label ?y .
			filter((langMatches(lang(?abstract),"de")) AND (langMatches(lang(?y),"de")) )
			}"""%elem.text
	sparql.setQuery(statement)
	sparql.setReturnFormat(JSON)
	results = sparql.query().convert()

	for result in results["results"]["bindings"]:
		animal = elem.getparent()
		animal.getchildren()[6].text = result["thumbnail"]["value"]
		animal.getchildren()[7].text = result["abstract"]["value"]
	
xmldoc.write('animals.xml', pretty_print=True)

sys.stdout.write(' Done!\n') 


