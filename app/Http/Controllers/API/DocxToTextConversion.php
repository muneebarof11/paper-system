<?php
/**
 * Created by PhpStorm.
 * User: Muneeb Arif
 * Date: 14/06/2021
 * Time: 2:20 PM
 */

namespace App\Http\Controllers\API;


class DocxToTextConversion
{
    private $document;

    public function __construct($DocxFilePath)
    {
        $this->document = $DocxFilePath;
    }

    public function convertToText()
    {
        if (isset($this->document) && !file_exists($this->document)) {
            return 'File Does Not exists';
        }

        $fileInformation = pathinfo($this->document);
        $extension = $fileInformation['extension'];
        if ($extension == 'doc' || $extension == 'docx') {
            if ($extension == 'doc') {
                return $this->extract_doc();
            } elseif ($extension == 'docx') {
                return $this->extract_docx();
            }
        } else {
            return 'Invalid File Type, please use doc or docx word document file.';
        }
    }

    private function extract_doc()
    {
        $fileHandle = fopen($this->document, 'r');
        $allLines = @fread($fileHandle, filesize($this->document));
        $lines = explode(chr(0x0D), $allLines);
        $document_content = '';
        foreach ($lines as $line) {
            $pos = strpos($line, chr(0x00));
            if (($pos !== false) || (strlen($line) == 0)) {
            } else {
                $document_content .= $line . ' ';
            }
        }
        $document_content = preg_replace("/[^a-zA-Z0-9\s\,\.\-\n\r\t@\/\_\(\)]/", '', $document_content);
        return $document_content;
    }

    private function extract_docx()
    {
        $document_content = '';
        $content = '';

        $zip = zip_open($this->document);

        if (!$zip || is_numeric($zip)) {
            return false;
        }

        while ($zip_entry = zip_read($zip)) {
            if (zip_entry_open($zip, $zip_entry) == false) {
                continue;
            }

            if (zip_entry_name($zip_entry) != 'word/document.xml') {
                continue;
            }

            $content .= zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));

            zip_entry_close($zip_entry);
        }

        zip_close($zip);

        $content = str_replace('</w:r></w:p></w:tc><w:tc>', ' ', $content);
        $content = str_replace('</w:r></w:p>', "\r\n", $content);
        $document_content = strip_tags($content);

        return $document_content;
    }

    /*Function to extract images*/
    function readZippedImages($filename)
    {
        $for_image = $filename;
        /*Create a new ZIP archive object*/
        $zip = new \ZipArchive();
        /*Open the received archive file*/
        $final_arr=array();
        $repo = array();
        if (true === $zip->open($filename))
        {
            for ($i=0; $i<$zip->numFiles;$i++)
            {
                if($i==3)//should be document.xml
                {
                    //======function using xml parser================================//
                    $check = $zip->getFromIndex($i);
                    //Create a new XMLReader Instance
                    $reader = new \XMLReader();
                    //Loading from a XML File or URL
                    //$reader->open($check);
                    //Loading from PHP variable
                    $reader->xml($check);

                    //====================parsing through the document==================//
                    while($reader->read())
                    {
                        $node_loc = $reader->localName;
                        if($reader->nodeType == \XMLREADER::ELEMENT && $reader->localName == 'body')
                        {
                            $reader->read();
                            $read_content = $reader->value. "\n";
                        }
                        if($node_loc == '#text')//parsing all the text from document using #text tag
                        {
                            $temp_value = array("text"=>$reader->value);
                            array_push($final_arr,$temp_value);
                            $reader->read();
                            $read_content = $reader->value. "\n";
                        }
                        if($node_loc == 'blip')//parsing all the images using blip tag which is under drawing tag
                        {
                            $attri_r = $reader->getAttribute("r:embed");
                            $current_image_name = $repo[$attri_r];
                            $image_stream = $this->showimage($for_image,$current_image_name);//return the base64 string
                            $temp_value = array("image"=>$image_stream);
                            array_push($final_arr,$temp_value);
                        }
                    }
                    //==================xml parser end============================//
                }
                if($i==2)//should be rels.xml
                {
                    $check_id = $zip->getFromIndex($i);
                    $reader_relation = new XMLReader();
                    $reader_relation->xml($check_id);

                    //====================parsing through the document==================//
                    while($reader_relation->read())
                    {
                        $node_loc = $reader_relation->localName;
                        if($reader_relation->nodeType == XMLREADER::ELEMENT && $reader_relation->localName == 'Relationship')
                        {
                            $read_content_id = $reader_relation->getAttribute("Id");
                            $read_content_name = $reader_relation->getAttribute("Target");
                            $repo[$read_content_id]=$read_content_name;
                        }

                    }
                }
            }
        }
    }


    function showimage($zip_file_original, $file_name_image)
    {
        $file_name_image = 'word/'.$file_name_image.'';// getting the image in the zip using its name
        $z_show = new ZipArchive();
        if ($z_show->open($zip_file_original) !== true) {
            echo "File not found.";
            return false;
        }

        $stat = $z_show->statName($file_name_image);
        $fp   = $z_show->getStream($file_name_image);
        if(!$fp) {
            echo "Could not load image.";
            return false;
        }

        header('Content-Type: image/jpeg');
        header('Content-Length: ' . $stat['size']);
        $image = stream_get_contents($fp);
        $picture = base64_encode($image);
        return $picture;//return the base62 string for the current image.
        fclose($fp);
    }
}