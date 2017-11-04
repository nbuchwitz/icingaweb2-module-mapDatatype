<?php

namespace Icinga\Module\Director\Web\Form\Element;

use Zend_Validate_Regex;

class Location extends FormElement
{
    public function init()
    {
        parent::init();

        $this->addDecorator('ViewScript', array(
            'viewScript' => 'location.phtml',
            'viewModule' => 'mapDatatype'

        ));

        $this->addValidator(new Zend_Validate_Regex('/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/'));
    }
//
//    public function setValue($value)
//    {
//        if (is_array($value)) {
//            @list($latitude, $longitude) = $value;
//            $value = sprintf('%f,%f', $latitude, $longitude);
//        }
//
//        return parent::setValue($value);
//    }
}