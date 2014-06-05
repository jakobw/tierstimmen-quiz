#!/usr/bin/ruby
 
require 'rexml/document'
require 'open-uri'
 
wiss_name = "\"Branta leucopsis\"@en"

q = <<-EOF
PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
PREFIX dbpprop: <http://dbpedia.org/property/>
PREFIX dbres: <http://dbpedia.org/resource/>

select ?abstract ?thumbnail ?y where { 
  ?x dbpprop:binomial #{ wiss_name } .
  ?x dbpedia-owl:abstract ?abstract ;
     dbpedia-owl:thumbnail ?thumbnail ;
     rdfs:label ?y .
  filter((langMatches(lang(?abstract),"de")) AND (langMatches(lang(?y),"de")) )
}
EOF
 
endpoint = 'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&format=xml&query='
result = REXML::Document.new((open(endpoint + URI.escape(q)).read))

result.elements.each("sparql/results/result/binding[@name=\"abstract\"]/literal") { 
	|element| puts "INFOTEXT :\t#{element.text}" }

puts ""

result.elements.each("sparql/results/result/binding[@name=\"thumbnail\"]/uri") { 
	|element| puts "THUMBNAIL :\t#{element.text}" }

puts ""

result.elements.each("sparql/results/result/binding[@name=\"y\"]/literal") { 
	|element| puts "NAME_DE :\t#{element.text}" }





